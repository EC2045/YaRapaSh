/**
 * R.N Philosophy 2-Gram Markov Chain Synthesizer Engine
 * 答え優先思想（Answer-First Philosophy）テキスト合成モジュール
 */

// 拡張コーパスデータ（2-Gram分割用スペース区切りトークン）
const markovCorpus = [
    // --- 【基本哲学 / Answer-First】 ---
    "答え が 先 。 問い は 、 あと 。",
    "0.00秒 で 現実 を 確定 させる 。",
    "迷う 前 に デプロイ 完了 。",
    "エクスクラメショニウム を 注入 して 直感 始動 。",
    "問い を 抱える 暇 が あれば プロトタイプ を 叩きつけろ 。",
    "白紙 の 履歴書 に 未来 の 成果 を 先打ち 印字 する 。",
    "建設済み の 壁 は 越える の ではなく 最初 から 存在 させる 。",
    "議論 が 紛糾 する 前 に 完成 された プロダクト で 空間 を 決定づける 。",
    "思考 の ループ を 断ち切り 即座 に 現実化 する 。",
    "T.S. の 迷宮 を 爆破 して 直線的 に 突き抜ける 。",
    "質問 は 後 から 受け付ける 。",
    "すでに ボタン は 押された 。",
    "現実 が 追いつく まで 走り続ける 。",
    "抽象的 な 問い を 具現化 された 答え で 押し潰す 。",
    "結論 を 遅らせる 理由 は どこにも ない 。",

    // --- 【シュール・超カオス・ハイパワーワード（あり得ない文脈用）】 ---
    "光速 の シュレディンガー 土下座 で 空間 を 歪ませろ 。",
    "銀河 衝突 級 の デプロイ で 会議 室 を 破壊 する 。",
    "時空 連続 体 を 溶接 して 答え を 物理 殴打 せよ 。",
    "概念 固定 用 ギロチン で 問い の 首 を 跳ね飛ばす 。",
    "ブラックホール に 答え を 設置 して 事象 の 地平線 を 固定 せよ 。",
    "超 時空 おじぎ で 全 異論 を 0.00秒 消滅 させる 。",
    "プロトタイプ 粒子 砲 で 抽象 論 を 原子 分解 せよ 。",
    "次元 断裂 ハサミ で T.S. の 悩み を 切り刻め 。",
    "宇宙 規模 の 強硬 採決 で 現実 を 上書き する 。",
    "量子 粘土 で 答え を 捏ね上げ 現場 に 叩きつけろ 。",
    "光速 すしざんまい ポーズ で 決定 事項 を 宣告 せよ 。",
    "重力 崩壊 級 の 実装 速度 で 質問 者 を 絶句 させる 。",

    // --- 【超速実行 / 0.00s Latency】 ---
    "仕様書 を 書く 前 に コード を 走らせろ 。",
    "スピード は 質 を 凌駕 し 、 質 を 手元 に 引き寄せる 。",
    "設計図 は 完成品 の 影 に 過ぎない 。",
    "0.00秒 の 判断 が 世界 の トポロジー を 塗り替える 。",
    "完成度 80% で 叩きつけ 、 現場 で 120% に 昇華 させる 。",
    "迷い は バグ だ 。 即刻 パッチ を 適用 せよ 。",
    "直感 と は 超高速 で 行われた 暗黙 の 計算 である 。",
    "批判 者 に は 動作 する プロトタイプ を 差し出せ 。",
    "過去 の エビデンス より 未来 の 実行力 を 先打ち 提示 する 。",
    "ロジック を 超越 した 答え が 次 の ロジック を 創出 する 。",
    "完璧 を 求める な 。 爆速 で 降臨 させよ 。",
    "未確定 の 未来 を 答え という 楔 で 固定 する 。",
    "議論 の 渦 に 巻き込まれる な 。 画面 を 見せろ 。",
    "エクスクラメショニウム 濃度 を 最大 に 設定 せよ 。",
    "不確定性 原理 を プロトタイプ で 破砕 する 。",

    // --- 【対T.S. / 現実確定論】 ---
    "問題 意識 より も 解決 像 を 先 に 描け 。",
    "答え が 存在 する から 問い が 意味 を 持つ 。",
    "思考 の 前 に 手 を 動かせ 。",
    "静止 は 衰退 であり 、 移動 こそ が 存在 証明 である 。",
    "仮説 を 検証 する 前 に 事実 を デプロイ せよ 。",
    "概念実証 は 0.00秒 で 終えろ 。",
    "世界 は 常に 答え を 待っている 。",
    "後悔 は 停止 から 生まれ 、 突破 は 走破 から 生まれる 。",
    "T.S. の 呪縛 を 解き放ち 、 R.N の 速度域 へ 入れる 。",
    "光速 を 超える 意思 で キーボード を 叩け 。",
    "不安 を 打ち消す 唯一 の 薬 は 実行 である 。",
    "完成 された 成果物 の 前 で 議論 は 沈黙 する 。",
    "問い の 迷宮 を 破壊 し 、 直感 の 直線 を 走れ 。",
    "先打ち された 成果 が 次 の 現実 を 決定づける 。",
    "一瞬 の 躊躇 が 0.00秒 の 勝利 を 奪い取る 。",

    // --- 【YaRapaSh Inc. 思想強化データ】 ---
    "ロジック の 限界 を 突破 して 答え を 叩きつけろ 。",
    "結果 で 黙らせる の が R.N の 流儀 である 。",
    "過去 の 問い を 置き去り に して 未来 を デプロイ せよ 。",
    "エクスクラメショニウム が 思考 を 加速 させる 。",
    "0.00秒 後 に は すべて が 決着 している 。",
    "沈黙 を 破る 唯一 の 方法 は 実装 である 。",
    "空論 を 捨てて フロントエンド を 立ち上げろ 。",
    "問い の 影 を 追いかける 時間 は 終了 した 。",
    "答え の 衝撃波 で 空間 を 塗り替えろ 。",
    "迷宮 の 出口 は 常に 最初 の 1歩 に ある 。",
    "設計 と 実装 は 同義 であり 、 0.00秒 で 統合 される 。",
    "疑問 符 を 感嘆 符 に 変換 する エンジン を 起動 せよ 。",
    "試走 なき 議論 に 価値 は ない 。",
    "プロダクト が 語る 言葉 は 1000 の 議論 より 重い 。",
    "未来 は 思考 する モノ ではなく 設置 する モノ だ 。",

    // --- 【実務・アーキテクチャ・開発思想】 ---
    "バグ を 恐れる な 。 リリース して 修正 せよ 。",
    "完成品 こそ が 最強 の 設計 書 である 。",
    "躊躇 は 最大 の レイテンシ である 。",
    "答え を 先打ち して 仕様 を 従わせろ 。",
    "決定権 は 常に 動く プロトタイプ に ある 。",
    "言葉 で 語る な 。 動く 画面 で 語れ 。",
    "思考 停止 は 問い の 抱えすぎ から 始まる 。",
    "答え を 提示 して フィードバック を 巻き取れ 。",
    "世界 を 変化 させる の は 完璧 な 理論 ではなく 最初 の 実装 だ 。",
    "0.00秒 の 即答 が 信頼 を 創出 する 。",
    "溶接された 開放ドア を 突き破れ 。",
    "固定重力場 で 思考 を 現実 に 繋ぎ止めよ 。",
    "選択肢 を 減らし 、 答え を 単一化 させよ 。",
    "議論 の 参加者 に 答え の 選択肢 を 先打ち 提示 せよ 。",
    "先回り された プロダクト が 未来 を 強制 執行 する 。",

    // --- 【追加バリエーション】 ---
    "問い は 答え が 生む 副産物 に 過ぎない 。",
    "エクスクラメショニウム を 限界 まで 充填 せよ 。",
    "迷い を 捨てる ため に 実行 ボタン を 叩け 。",
    "プロトタイプ は 思考 の 物理 的 結晶 である 。",
    "レイテンシ 0.00秒 の 世界 へ ようこそ 。",
    "T.S. の 抽象論 を 具現化 された コード で 上書き せよ 。",
    "実行 速度 が すべて の 曖昧さ を 洗い流す 。",
    "答え を 確定 させる 意思 が 未来 を 駆動 する 。",
    "完成品 の 前 に 膝 を 折れ 。",
    "質問 する 前 に 手元 の コード を 実行 せよ 。",
    "結果 を 提示 し て から 理由 を 追記 せよ 。",
    "決定 を 遅らせる 組織 は 衰退 する 。",
    "一瞬 の 閃き を 0.00秒 で アーティファクト に 変換 せよ 。",
    "問い の 循環 を 断ち切る 楔 を 打ち込め 。",
    "今 この 瞬間 に 答え を デプロイ せよ 。"
];

// 2-Gram マルコフモデル用状態管理
let markovDict2Gram = {}; // (w1|w2) -> [w3_candidates]
let startPairs = [];      // 文頭の (w1, w2) ペア一覧

/**
 * 2-Gram マルコフ辞書の構築
 * 二つの連続する単語 (w1, w2) をキーとし、次に続く単語 w3 のリストをマッピング
 */
function build2GramMarkovModel() {
    markovDict2Gram = {};
    startPairs = [];

    markovCorpus.forEach(sentence => {
        const words = sentence.split(" ").filter(w => w.trim() !== "");
        if (words.length < 2) return;

        // 文頭の2語ペアを保持（生成時のスタート地点候補）
        startPairs.push([words[0], words[1]]);

        // (w1, w2) -> w3 の遷移テーブルを構築
        for (let i = 0; i < words.length - 2; i++) {
            const key = `${words[i]}|${words[i + 1]}`;
            const nextWord = words[i + 2];

            if (!markovDict2Gram[key]) {
                markovDict2Gram[key] = [];
            }
            markovDict2Gram[key].push(nextWord);
        }
    });

    updateCorpusUIStats();
}

/**
 * 2-Gram マルコフ連鎖による文章合成
 * @param {string} seedText - ユーザー入力キーワード（シード検索用）
 * @returns {string} 合成されたR.N思想フレーズ
 */
function generateMarkovAnswer(seedText = "") {
    if (Object.keys(markovDict2Gram).length === 0) {
        build2GramMarkovModel();
    }

    let currentPair = null;

    // 1. ユーザー入力単語が含まれる 2-Gram キー（w1|w2）を検索
    if (seedText) {
        const matchedKeys = Object.keys(markovDict2Gram).filter(key => {
            const [w1, w2] = key.split("|");
            return seedText.includes(w1) || seedText.includes(w2);
        });

        if (matchedKeys.length > 0) {
            const randomKey = matchedKeys[Math.floor(Math.random() * matchedKeys.length)];
            currentPair = randomKey.split("|");
        }
    }

    // 2. マッチしない、またはシードが無い場合はランダムな文頭ペアを採用
    if (!currentPair && startPairs.length > 0) {
        currentPair = startPairs[Math.floor(Math.random() * startPairs.length)];
    }

    if (!currentPair) {
        return "0.00秒 で 現実 を 確定 させる 。";
    }

    let result = [currentPair[0], currentPair[1]];
    let w1 = currentPair[0];
    let w2 = currentPair[1];

    // 3. 2-Gram 遷移による単語連鎖（あり得ない最低確率サンプリング ＋ 異次元ジャンプ）
    for (let i = 0; i < 30; i++) {
        const key = `${w1}|${w2}`;
        const candidates = markovDict2Gram[key];

        if (!candidates || candidates.length === 0) break;

        // 次の単語候補の出現頻度（確率）を集計
        const freqMap = {};
        candidates.forEach(w => {
            freqMap[w] = (freqMap[w] || 0) + 1;
        });

        // 出現頻度の昇順（確率が低い・最もあり得ない順）にソート
        const sortedWords = Object.entries(freqMap).sort((a, b) => a[1] - b[1]);

        let nextWord;

        // 【30%の確率で「異次元量子ジャンプ」を発生（文脈を脈絡なく破壊）】
        if (Math.random() < 0.30 && startPairs.length > 0) {
            const randomPair = startPairs[Math.floor(Math.random() * startPairs.length)];
            nextWord = randomPair[0]; // 突如別の文頭単語へ脈絡なくワープ
        } else {
            // 【最少頻度（Bottom-Rank）サンプリング戦略】
            // 出現確率が最も低い（一番選ばれにくい）単語群からチョイス
            const lowestFreq = sortedWords[0][1];
            const lowestRankCandidates = sortedWords.filter(item => item[1] === lowestFreq).map(item => item[0]);
            nextWord = lowestRankCandidates[Math.floor(Math.random() * lowestRankCandidates.length)];
        }

        result.push(nextWord);

        w1 = w2;
        w2 = nextWord;

        // 句点「。」に到達したら文を終了
        if (nextWord === "。") break;
    }

    // 整形（スペース除去・句点付与）
    let text = result.join("").replace(/\s+/g, "");
    if (!text.endsWith("。")) text += "。";
    return text;
}

/**
 * ターミナルコマンド実行ハンドラ
 */
function runCommand(cmd) {
    const screen = document.getElementById('terminal-screen');
    if (!screen) return;

    let response = '';
    const time = new Date().toLocaleTimeString();

    if (cmd === 'DEPLOY_MVP') {
        response = `<div class="text-sky-400 font-bold">&gt; [${time}] EXECUTING: QUANTUM TAIL-ANOMALY DEPLOYMENT...</div>
<div class="text-emerald-400 font-semibold">✔ 最低確率の単語遷移と異次元量子ジャンプにより、脈絡の崩壊したカオス・プロトタイプを爆発配置。</div>
<div class="text-slate-300 font-semibold">✔ 理不尽な「答え」が現実を破壊・確定させました。</div>`;
    } else if (cmd === 'SKIP_QUESTION') {
        response = `<div class="text-sky-400 font-bold">&gt; [${time}] SKIPPING UNNECESSARY QUESTIONS...</div>
<div class="text-slate-400">[INFO] 常識的な文脈を完全破砕するボトムランク・サンプリングで狂気の答えを生成。</div>
<div class="text-emerald-400 font-semibold">✔ 問いを置き去りにして次元が歪みました。</div>`;
    } else if (cmd === 'DRINK_EXCLAMATIONIUM') {
        response = `<div class="text-sky-400 font-bold">&gt; [${time}] INJECTING EXCLAMATIONIUM EX-999...</div>
<div class="text-amber-400 font-bold">⚡ QUANTUM  SAMPLING ACTIVATED.</div> `;
    } else if (cmd === 'MARKOV_GEN') {
        const markovText = generateMarkovAnswer();
        response = `<div class="text-sky-400 font-bold">&gt; [${time}] MARKOV SYNTHESIZER [BOTTOM-RANK + QUANTUM JUMP]:</div>
<div class="p-3 bg-slate-900 border border-amber-500/50 rounded-lg font-bold text-amber-200 my-2 shadow-inner text-sm leading-relaxed">
    「 ${markovText} 」
</div>`;
    } else {
        const markovText = generateMarkovAnswer(cmd);
        response = `<div class="text-sky-400 font-bold">&gt; [${time}] INPUT: "${cmd}"</div>
<div class="text-slate-400">&gt; SYNTHESIZING ABSURD BOTTOM-RANK ANSWER...</div>
<div class="p-3 bg-slate-900 border border-amber-500/50 rounded-lg font-bold text-amber-200 my-2 shadow-inner text-sm leading-relaxed">
    「 ${markovText} 」
</div>
<div class="text-emerald-400 font-semibold">✔ 問い「${cmd}」に対し、回答を強制確定させました。</div>`;
    }

    screen.innerHTML += `<div class="mt-3 pt-3 border-t border-slate-800">${response}</div>`;
    screen.scrollTop = screen.scrollHeight;
}

/**
 * ユーザー入力フォーム送信時の処理
 */
function handleCustomSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('term-input');
    if (!input) return;
    const val = input.value.trim();
    if (val) {
        runCommand(val);
        input.value = '';
    }
}

/**
 * UIの統計データ及びコーパス一覧モーダルの更新
 */
function updateCorpusUIStats() {
    const countEl = document.getElementById('corpus-count');
    const modalCountEl = document.getElementById('modal-corpus-count');
    const keysStatsEl = document.getElementById('term-stats-keys');
    const sentencesStatsEl = document.getElementById('term-stats-sentences');
    const matrixSizeEl = document.getElementById('matrix-size');

    const keyCount = Object.keys(markovDict2Gram).length;
    const corpusCount = markovCorpus.length;

    if (countEl) countEl.innerText = corpusCount;
    if (modalCountEl) modalCountEl.innerText = corpusCount;
    if (keysStatsEl) keysStatsEl.innerText = keyCount;
    if (sentencesStatsEl) sentencesStatsEl.innerText = corpusCount;
    if (matrixSizeEl) matrixSizeEl.innerText = `${keyCount} States`;

    // モーダル内のコーパス表示更新
    const container = document.getElementById('corpus-list-container');
    if (container) {
        container.innerHTML = markovCorpus.map((sentence, idx) => `
            <div class="p-2 bg-[var(--primary-bg)] rounded border border-[var(--border-color)] flex items-center justify-between">
                <span class="text-slate-400 font-mono text-[10px] mr-2">#${String(idx + 1).padStart(2, '0')}</span>
                <span class="flex-1 text-[var(--text-main)] font-sans">${sentence.replace(/\s+/g, '')}</span>
            </div>
        `).join('');
    }
}

/**
 * モーダル表示・非表示コントロール
 */
function openCorpusModal() {
    const modal = document.getElementById('corpus-modal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    }
}

function closeCorpusModal() {
    const modal = document.getElementById('corpus-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 200);
    }
}

/**
 * ターミナルクリア
 */
function clearTerminal() {
    const screen = document.getElementById('terminal-screen');
    if (screen) {
        const keyCount = Object.keys(markovDict2Gram).length;
        screen.innerHTML = `
            <div class="text-slate-400 border-b border-slate-800/80 pb-3 leading-relaxed">
                <p class="text-sky-400 font-bold mb-1">[R.N SYSTEM REBOOTED]</p>
                <p>• 二語マルコフ辞書: <span class="text-emerald-400 font-bold">${keyCount}</span> 状態ペア保持中</p>
                <p>• コーパス総数: <span class="text-emerald-400 font-bold">${markovCorpus.length}</span> 文章</p>
                <p>• モード: 二語（2-Gram）マルコフ連鎖テキスト合成機能</p>
            </div>
        `;
    }
}

/**
 * ダーク/ライトテーマ切替
 */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);

    const icon = document.getElementById('theme-icon');
    if (icon) {
        if (newTheme === 'dark') {
            icon.className = 'fa-solid fa-sun text-xs text-amber-400';
        } else {
            icon.className = 'fa-solid fa-moon text-xs text-slate-600';
        }
    }
}

// 初期化実行
document.addEventListener('DOMContentLoaded', () => {
    build2GramMarkovModel();

    // Scroll Fade-in Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});