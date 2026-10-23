/**
 * ぬるぬる図鑑 - メイン制御スクリプト
 * localStorage連携、重複防止、種類別集計、XSS対策、フォールバック画像処理
 */

// localStorageのキー名
const STORAGE_KEY = "nuru_collected_ids";

// -----------------------------------------------------------------------------
// 1. localStorage 操作関数群
// -----------------------------------------------------------------------------

/**
 * 保存済みの個体IDリストを取得（重複のない配列を返却）
 */
function getCollectedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.error("localStorageの読み込みに失敗しました:", e);
    return [];
  }
}

/**
 * 新しい個体IDを保存（重複防止）
 */
function saveCollectedId(id) {
  if (!id) return false;
  const ids = getCollectedIds();
  const normalizedId = id.trim().toUpperCase();
  if (ids.includes(normalizedId)) {
    return false; // 既に登録済み
  }
  ids.push(normalizedId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return true;
  } catch (e) {
    console.error("localStorageの保存に失敗しました:", e);
    return false;
  }
}

/**
 * 指定の個体IDが登録済みかどうか
 */
function isIdCollected(id) {
  if (!id) return false;
  const ids = getCollectedIds();
  return ids.includes(id.trim().toUpperCase());
}

/**
 * 獲得済みのユニークな種類数を計算（全10種類）
 */
function calculateUniqueCategories(collectedIds) {
  const categorySet = new Set();
  collectedIds.forEach(function(id) {
    const creature = findCreatureById(id);
    if (creature && creature.category) {
      categorySet.add(creature.category);
    }
  });
  return categorySet.size;
}

// -----------------------------------------------------------------------------
// 2. 画像エラー時のフォールバック処理ヘルパー
// -----------------------------------------------------------------------------

/**
 * 画像が存在しない・読み込めない場合に枠が崩れないプレースホルダーを表示
 */
function attachImageFallback(imgElement, containerElement, labelText) {
  imgElement.addEventListener("error", function() {
    imgElement.style.display = "none";
    // 既存のfallbackがあれば追加しない
    if (!containerElement.querySelector(".img-fallback")) {
      const fallback = document.createElement("div");
      fallback.className = "img-fallback";
      fallback.textContent = labelText || "No Image";
      containerElement.appendChild(fallback);
    }
  });
}

// -----------------------------------------------------------------------------
// 3. index.html（トップページ）の初期化と描画
// -----------------------------------------------------------------------------

function initIndexPage() {
  const progressScore = document.getElementById("progressScore");
  const progressBarFill = document.getElementById("progressBarFill");
  const collectionGrid = document.getElementById("collectionGrid");
  const emptyState = document.getElementById("emptyState");
  const resetBtn = document.getElementById("resetDataBtn");

  if (!collectionGrid) return; // index.html ではない場合は終了

  // 1. 保存済みデータの取得
  const collectedIds = getCollectedIds();

  // 2. 種類コンプリート数の集計・表示
  const uniqueCategoryCount = calculateUniqueCategories(collectedIds);
  const totalCategories = (typeof TOTAL_CATEGORIES_COUNT !== "undefined") ? TOTAL_CATEGORIES_COUNT : 10;
  
  if (progressScore) {
    progressScore.textContent = uniqueCategoryCount + " / " + totalCategories;
  }
  if (progressBarFill) {
    const percent = Math.min(100, Math.round((uniqueCategoryCount / totalCategories) * 100));
    progressBarFill.style.width = percent + "%";
  }

  // 3. コレクション一覧の描画
  collectionGrid.innerHTML = "";

  // 登録済みIDから個体データを抽出
  const collectedCreatures = [];
  collectedIds.forEach(function(id) {
    const creature = findCreatureById(id);
    if (creature) {
      collectedCreatures.push(creature);
    }
  });

  if (collectedCreatures.length === 0) {
    // 登録個体ゼロの場合
    if (emptyState) emptyState.style.display = "block";
  } else {
    if (emptyState) emptyState.style.display = "none";

    // 獲得済み個体カードの生成（XSS対策のため textContent を徹底）
    collectedCreatures.forEach(function(item) {
      const card = document.createElement("article");
      card.className = "creature-card";

      const link = document.createElement("a");
      link.className = "creature-card-link";
      link.href = "creature.html?id=" + encodeURIComponent(item.id);

      // 個体IDバッジ
      const idBadge = document.createElement("span");
      idBadge.className = "creature-card-id";
      idBadge.textContent = item.id;

      // 画像ラッパー
      const imgWrap = document.createElement("div");
      imgWrap.className = "creature-card-img-wrap";

      const img = document.createElement("img");
      img.className = "creature-card-img";
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";
      attachImageFallback(img, imgWrap, item.name);

      imgWrap.appendChild(img);

      // カード本文
      const cardBody = document.createElement("div");
      cardBody.className = "creature-card-body";

      const nameEl = document.createElement("h3");
      nameEl.className = "creature-card-name";
      nameEl.textContent = item.name;

      const metaEl = document.createElement("div");
      metaEl.className = "creature-card-meta";

      const catBadge = document.createElement("span");
      catBadge.className = "badge-category";
      catBadge.textContent = item.category;

      const slimyBadge = document.createElement("span");
      slimyBadge.className = "badge-slimy slimy-" + item.slimyLevel;
      slimyBadge.textContent = "ぬるぬる度: " + item.slimyLevel;

      metaEl.appendChild(catBadge);
      metaEl.appendChild(slimyBadge);

      cardBody.appendChild(nameEl);
      cardBody.appendChild(metaEl);

      // 組み立て
      link.appendChild(idBadge);
      link.appendChild(imgWrap);
      link.appendChild(cardBody);
      card.appendChild(link);

      collectionGrid.appendChild(card);
    });
  }

  // データ初期化ボタン（テスト用）
  if (resetBtn) {
    resetBtn.addEventListener("click", function() {
      if (confirm("登録した図鑑データをすべて消去しますか？\n（獲得前の初期状態に戻ります）")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 4. creature.html（個体詳細・登録ページ）の初期化と処理
// -----------------------------------------------------------------------------

function initCreaturePage() {
  const detailCard = document.getElementById("creatureDetail");
  const errorView = document.getElementById("errorView");
  const registerBtn = document.getElementById("registerBtn");

  if (!detailCard || !errorView) return; // creature.html ではない場合は終了

  // 1. URLパラメータから id を取得
  const params = new URLSearchParams(window.location.search);
  const creatureId = params.get("id");

  // 2. 個体データの検索
  const creature = findCreatureById(creatureId);

  // 存在しない、または不正なIDの場合はエラー画面を表示
  if (!creature) {
    detailCard.style.display = "none";
    errorView.style.display = "block";
    return;
  }

  // 正常表示
  errorView.style.display = "none";
  detailCard.style.display = "block";

  // 要素へ値を反映（XSS対策：textContent を使用）
  const idBadge = document.getElementById("creatureIdBadge");
  const idText = document.getElementById("creatureIdText");
  const nameEl = document.getElementById("creatureName");
  const catBadge = document.getElementById("creatureCategory");
  const catText = document.getElementById("creatureCategoryText");
  const slimyBadge = document.getElementById("creatureSlimy");
  const slimyText = document.getElementById("creatureSlimyText");
  const sizeEl = document.getElementById("creatureSize");
  const personalityEl = document.getElementById("creaturePersonality");
  const imgEl = document.getElementById("creatureImg");
  const imgWrap = document.getElementById("detailImgWrap");
  const successBanner = document.getElementById("registerSuccessBanner");

  if (idBadge) idBadge.textContent = "ID: " + creature.id;
  if (idText) idText.textContent = creature.id;
  if (nameEl) nameEl.textContent = creature.name;
  if (catBadge) catBadge.textContent = creature.category;
  if (catText) catText.textContent = creature.category;

  if (slimyBadge) {
    slimyBadge.textContent = "ぬるぬる度: " + creature.slimyLevel;
    slimyBadge.className = "badge-slimy slimy-" + creature.slimyLevel;
  }
  if (slimyText) slimyText.textContent = creature.slimyLevel;

  if (sizeEl) sizeEl.textContent = creature.size;
  if (personalityEl) personalityEl.textContent = creature.personality;

  if (imgEl) {
    imgEl.src = creature.image;
    imgEl.alt = creature.name;
    attachImageFallback(imgEl, imgWrap, creature.name);
  }

  // 3. 登録ボタンの状態判定
  function updateButtonState(isRegistered) {
    if (!registerBtn) return;
    if (isRegistered) {
      registerBtn.textContent = "登録済み！";
      registerBtn.className = "btn btn-registered";
      registerBtn.disabled = true;
    } else {
      registerBtn.textContent = "図鑑に登録！";
      registerBtn.className = "btn btn-register";
      registerBtn.disabled = false;
    }
  }

  // 初期ロード時の登録状態チェック
  const alreadySaved = isIdCollected(creature.id);
  updateButtonState(alreadySaved);

  // 4. 「図鑑に登録！」ボタン押下時のイベント
  if (registerBtn) {
    registerBtn.addEventListener("click", function() {
      if (isIdCollected(creature.id)) {
        return; // すでに登録済みなら何もしない
      }

      const success = saveCollectedId(creature.id);
      if (success) {
        updateButtonState(true);
        if (successBanner) {
          successBanner.style.display = "block";
        }
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 5. ページ読み込み時の自動実行
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  initIndexPage();
  initCreaturePage();
});