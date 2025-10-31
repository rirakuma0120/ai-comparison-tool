const demoResponses = {
    gemini: "ジェミニは「実践とアウトプット」を推奨します。学んだことをすぐに小さなプロジェクトで試すことで、知識が定着しやすくなります。",
    claude: "クロードは「習慣化」が鍵だと考えます。毎日30分でも良いので、決まった時間に学習するルーティンを作ることが成功に繋がります。",
    chatgpt: "チャットGPTは「体系的な学習」が重要だと答えます。基礎から応用へ、段階を踏んだカリキュラムやロードマップに従うのが効率的です。",
    copilot: "コパイロットは「コミュニティへの参加」を提案します。他の学習者や専門家と交流することで、モチベーション維持と問題解決が加速します。"
};

function magicCompare() {
    const question = document.getElementById('questionInput').value;
    if (!question.trim()) {
        alert('質問を入力してください！🍋🕵️‍♀️');
        return;
    }

    // ローディング表示
    document.getElementById('loading').classList.add('show');
    document.getElementById('results').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';

    // 5秒後に結果表示（実際のAPIでは非同期処理）
    setTimeout(() => {
        showResults();
    }, 5000);
}

function showResults() {
    const responses = moodResponses[currentMood];
    const times = {
        gemini: Math.random() * 2 + 1.5,  // 1.5-3.5秒
        claude: Math.random() * 2 + 2.0,  // 2.0-4.0秒
        chatgpt: Math.random() * 2 + 1.8, // 1.8-3.8秒
        copilot: Math.random() * 2 + 2.5  // 2.5-4.5秒
    };

    const costs = {
        gemini: 0,
        claude: 0.4,
        chatgpt: 0.5,
        copilot: 0.15  // 月額制での1回あたり推定
    };

    // 回答表示
    Object.keys(responses).forEach(ai => {
        document.getElementById(`${ai}-response`).textContent = responses[ai];
        document.getElementById(`${ai}-words`).textContent = `${responses[ai].length}文字`;
        document.getElementById(`${ai}-time`).textContent = `${times[ai].toFixed(1)}秒`;
        
        if (ai === 'claude') {
            document.getElementById(`claude-cost`).textContent = `¥${costs[ai]}`;
        } else if (ai === 'chatgpt') {
            document.getElementById(`chatgpt-cost`).textContent = `¥${costs[ai]}`;
        }
    });

    // 統計計算
    const totalWords = Object.values(responses).reduce((sum, text) => sum + text.length, 0);
    const avgWords = Math.round(totalWords / 4);
    const avgTime = Object.values(times).reduce((sum, time) => sum + time, 0) / 4;
    const fastestAI = Object.keys(times).reduce((a, b) => times[a] < times[b] ? a : b);
    const longestAI = Object.keys(responses).reduce((a, b) => responses[a].length > responses[b].length ? a : b);
    const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

    document.getElementById('avg-words').textContent = avgWords;
    document.getElementById('avg-time').textContent = avgTime.toFixed(1);
    document.getElementById('fastest-ai').textContent = fastestAI.charAt(0).toUpperCase() + fastestAI.slice(1);
    document.getElementById('longest-response').textContent = longestAI.charAt(0).toUpperCase() + longestAI.slice(1);
    document.getElementById('total-cost').textContent = `¥${totalCost.toFixed(1)}`;

    // 表示切り替え
    document.getElementById('loading').classList.remove('show');
    document.getElementById('results').style.display = 'grid';
    document.getElementById('statistics').style.display = 'block';
}

    // 初期サンプル質問
    document.getElementById('questionInput').value = "新しいスキルを学ぶ最適な方法は？";


// 既存のJavaScriptコードの最後に、このブロックをそのまま貼り付けます

/**
* 質問入力欄の高さを内容に合わせて自動で調整する関数
    */
function autoResizeTextarea() {
    const textarea = document.getElementById('questionInput');

    // 1. 高さをリセットする（これが縮むために必要）
    textarea.style.height = 'auto';
    
    // 2. コンテンツ全体が入る高さに設定する
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

    // ページの読み込みが完了したら、準備としてこの関数を実行する
    document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('questionInput');

    // ページロード時の初期リサイズ 
    autoResizeTextarea(); 

    // ユーザーが入力するたびに autoResizeTextarea を実行するように「監視」をセット
    textarea.addEventListener('input', autoResizeTextarea);
});


// 評価ボタンの機能（カウント付き）
let likeCounts = {gemini: 0, claude: 0, chatgpt: 0, copilot: 0};
let dislikeCounts = {gemini: 0, claude: 0, chatgpt: 0, copilot: 0};

document.querySelectorAll('.like-btn').forEach((button, index) => {
    const aiNames = ['gemini', 'claude', 'chatgpt', 'copilot'];
    const aiName = aiNames[index];
    let isLiked = false;  // 押したかフラグ
    
    button.addEventListener('click', function() {
        if (!isLiked) {
            // いいね
            likeCounts[aiName]++;
            this.style.background = '#4CAF50';
            isLiked = true;
        } else {
            // 取り消し
            likeCounts[aiName]--;
            this.style.background = '';
            isLiked = false;
        }
        const countSpan = this.parentElement.nextElementSibling.querySelector('.like-count');
        countSpan.textContent = `👍 ${likeCounts[aiName]}`;
    });
});

document.querySelectorAll('.dislike-btn').forEach((button, index) => {
    const aiNames = ['gemini', 'claude', 'chatgpt', 'copilot'];
    const aiName = aiNames[index];
    let isDisliked = false;  // 押したかフラグ
    
    button.addEventListener('click', function() {
        if (!isDisliked) {
            // イマイチ
            dislikeCounts[aiName]++;
            this.style.background = '#f44336';
            isDisliked = true;
        } else {
            // 取り消し
            dislikeCounts[aiName]--;
            this.style.background = '';
            isDisliked = false;
        }
        const countSpan = this.parentElement.nextElementSibling.querySelector('.dislike-count');
        countSpan.textContent = `👎 ${dislikeCounts[aiName]}`;
    });
});

// コピー機能
function copyResponse(aiName) {
    // AIの回答を取得
    const responseElement = document.getElementById(`${aiName}-response`);
    const text = responseElement.textContent;
    
    // クリップボードにコピー
    navigator.clipboard.writeText(text).then(() => {
        // コピー成功メッセージ
        alert('📋 コピーしました！');
    }).catch(err => {
        console.error('コピー失敗:', err);
    });
}

// テーマカラー切り替え機能（パキッと版）
function changeTheme(theme) {
    const body = document.body;
    
    if (theme === 'lemon') {
        // レモンテーマ🍋（パキッと）
        body.style.background = 'linear-gradient(135deg, #FFEB3B 0%, #FDD835 50%, #F9A825 100%)';
    } else if (theme === 'pink') {
        // ピンクテーマ💗（パキッと）
        body.style.background = 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)';
    } else if (theme === 'blue') {
        // ブルーテーマ💙（パキッと）
        body.style.background = 'linear-gradient(135deg, #42A5F5 0%, #2196F3 50%, #1976D2 100%)';
    }
    
    console.log(`${theme}テーマに変更しました✨`);
}
// ダークモード切り替え機能
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        // ダークモードON
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-btn').textContent = '☀️ ライトモード';
    } else {
        // ダークモードOFF
        document.body.classList.remove('dark-mode');
        document.querySelector('.dark-mode-btn').textContent = '🌙 ダークモード';
    }
}

// 履歴表示機能（新バージョン）
function showHistory() {
    // localStorageから全ての保存データを取得
    const allData = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('saved_')) {
            const data = JSON.parse(localStorage.getItem(key));
            allData.push({...data, key: key});
        }
    }
        allData.sort((a, b) => { 
        return new Date(b.timestamp) - new Date(a.timestamp); 
    });

    if (allData.length === 0) {
        alert('📜 まだ保存された履歴がありません');
        return;
    }
    
    // 履歴リストを作成
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    allData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
            <div class="history-card-header">
                <span class="ai-badge">${item.aiName}</span>
                <span class="mood-badge">${getMoodEmoji(item.mood)}</span>
                <span class="history-date">${item.timestamp}</span>
            </div>
            <div class="history-question">Q: ${item.question}</div>
            <div class="history-answer">A: ${item.answer.substring(0, 100)}...</div>
             <button class="delete-btn" onclick="deleteHistory('${item.key}')">🗑️ 削除</button>
        `;
        historyList.appendChild(card);
    });
    
    document.getElementById('historyModal').style.display = 'block';
}

function closeHistory() {
    document.getElementById('historyModal').style.display = 'none';
}

// 保存機能
function saveResponse(aiName) {
    const question = document.getElementById('questionInput').value;
    const responseElement = document.getElementById(`${aiName}-response`);
    const answer = responseElement.textContent;
    
    if (!answer.trim()) {
        alert('保存する回答がありません！');
        return;
    }

    // 保存データを作成
    const saveData = {
        aiName: aiName,
        question: question,
        answer: answer,
        mood: currentMood,  // ← この行を追加
        timestamp: new Date().toLocaleString()
    };

    // localStorageに保存
    const key = `saved_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(saveData));
    alert('回答を保存しました！');
}

// 気分設定
let currentMood = 'friendly';

function setMood(mood) {
    currentMood = mood;
    
    // ボタンのアクティブ状態を変更
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// 気分別の回答データ
const moodResponses = {
    friendly: {
        gemini: "プログラミングって楽しいよね！🎉 コードを書いて、自分のアイデアを形にできるんだ。最初は難しく感じるかもしれないけど、一緒に頑張ろう✨",
        claude: "こんにちは😊 プログラミング学習、応援してます！段階的に進めて、焦らず楽しくやっていきましょうね🍋",
        chatgpt: "わあ、素敵な質問だね！💫 プログラミングは創造性を発揮できる最高のツールだよ。一緒に楽しく学んでいこう🚀",
        copilot: "やあ！👋 プログラミングで君のアイデアを実現しよう。コーディングは楽しい冒険だよ✨"
    },
    formal: {
        gemini: "プログラミングとは、コンピュータに対して命令を記述し、特定の処理を実行させる技術です。体系的な学習により、確実にスキルを習得できます。",
        claude: "プログラミング学習において、基礎の理解と段階的なアプローチが重要です。適切な学習計画に基づき、着実に進めることをお勧めいたします。",
        chatgpt: "プログラミングは論理的思考力を養い、問題解決能力を向上させる重要なスキルです。計画的な学習により、確実な技術習得が可能です。",
        copilot: "ソフトウェア開発において、プログラミングスキルは必須の要素です。体系的な学習により、実務レベルの能力を身につけることができます。"
    },
    humorous: {
        gemini: "プログラミング？それはバグとの壮絶なバトルさ！😂 でもバグを倒したときの快感は最高だよ🎮 さあ、コードの世界へようこそ(笑)",
        claude: "プログラミング 学習は、まるで迷路を彷徨うようなもの。でも心配しないで、出口は必ずあるから！🌀🗺️",
        chatgpt: "プログラミングを学ぶのは、まるで魔法使いになるようなもの🧙‍♂️✨ ただし、呪文（コード）を間違えると爆発（バグ）が起きるから注意してね！💥",
        copilot: "プログラミング学習は、まるでパズルを解くようなもの🧩 時々ピースが見つからなくてイライラするけど、完成したときの達成感は格別さ！😆"
    },
    otaku: {
        gemini: "プログラミング？それはまさに異世界転生スキル！🎮 コードを書くことで新たな世界を創造できるんだ。バグは魔王、デバッグは勇者の冒険さ⚔️",
        claude: "プログラミングとは、いわば電子の魔導書📖 適切な呪文(コード)を詠唱することで、コンピュータという使い魔を操る技術なのです🔮",
        chatgpt: "プログラミングって最強のチート能力だよね！✨ レベル1から始めて、経験値を積んでスキルツリーを解放していく感じ🎯 バグという強敵と戦いながら成長するRPGさ🗡️",
        copilot: "プログラミングはまさにロボットアニメの操縦席！🤖 コマンド入力でメカを動かす感覚。エラーが出たら「システム異常発生！」って叫びたくなるよね😂"
    },
    kids: {
        gemini: "プログラミングってね、コンピューターさんにおねがいすることだよ！🌟 「これやって！」ってたのむと、コンピューターさんがやってくれるんだ。まほうみたいだね✨",
        claude: "プログラミングはね、コンピューターくんとおはなしすることだよ😊 ことばをつかって、「こうしてね」っておねがいするの。たのしいよ🍋",
        chatgpt: "プログラミングって、ロボットくんにめいれいすることだよ！🤖 「みぎにすすんで」「ひだりにまがって」ってつたえると、ロボットくんがうごくんだ。すごいでしょ？✨",
        copilot: "プログラミングはね、コンピューターさんのせんせいになることだよ👨‍🏫 「1+1は2だよ」とか、いろいろおしえてあげるの。コンピューターさんはおぼえるのがとってもはやいんだ💨"
    },
    kansai: {
        gemini: "プログラミング？あれはな、めっちゃおもろい技術やで！🎉 コンピュータに『これやっとけ！』って指示するんや。最初はむずいかもしれへんけど、慣れたら楽しいで〜✨",
        claude: "プログラミングっちゅうのはな、コンピュータと話す方法やねん😊 ちゃんと順番に教えたら、コンピュータも分かってくれるで。焦らんとコツコツいこや🍋",
        chatgpt: "プログラミングはな、めっちゃ創造的な作業やで！💫 自分の頭の中のアイデアを形にできるんや。失敗してもええねん、それが成長のもとやからな🚀",
        copilot: "プログラミング？そんなん簡単やで！👋 まあ最初はバグだらけになるけどな(笑) でもそれも含めて楽しいねん。一緒にがんばろうや✨"
    }
}

// 履歴をダウンロード
function exportHistory() {
    // localStorageから全ての保存データを取得
    const allData = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('saved_')) {
            const data = JSON.parse(localStorage.getItem(key));
            allData.push(data);
        }
    }
    
    if (allData.length === 0) {
        alert('💾 まだ保存された履歴がありません');
        return;
    }
    
    // テキスト形式に変換
    let textContent = '=== AI比較ツール 保存履歴 ===\n\n';
    
    allData.forEach((item, index) => {
        textContent += `【${index + 1}】\n`;
        textContent += `AI: ${item.aiName}\n`;
        textContent += `日時: ${item.timestamp}\n`;
        textContent += `質問: ${item.question}\n`;
        textContent += `回答:\n${item.answer}\n`;
        textContent += `${'='.repeat(50)}\n\n`;
    });
    
    // ファイルとしてダウンロード
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI比較履歴_${new Date().toLocaleDateString('ja-JP')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('💾 履歴をダウンロードしました！');
}

// 全削除機能
function deleteAllHistory() {
    if (!confirm('全ての履歴を削除しますか？')) return;
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key.startsWith('saved_')) {
            localStorage.removeItem(key);
        }
    }
    
    alert('全ての履歴を削除しました');
    closeHistory();
}
// 個別削除機能
function deleteHistory(key) {
    if (!confirm('この履歴を削除しますか？')) return;
    
    localStorage.removeItem(key);
    alert('削除しました');
    showHistory();  // 履歴を再表示
}

// 気分に対応する絵文字
function getMoodEmoji(mood) {
    const moodMap = {
        'friendly': '😊 フレンドリー',
        'formal': '📝 フォーマル',
        'humorous': '😂 ユーモラス',
        'otaku': '🎮 オタク風',
        'kids': '👶 子供向け',
        'kansai': '🗣️ 関西弁'
    };
    return moodMap[mood] || '😊 フレンドリー';
}
// 印刷機能
function printHistory() {
    window.print();
}

// 統計表示機能
function showStats() {
    const allData = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('saved_')) {
            const data = JSON.parse(localStorage.getItem(key));
            allData.push(data);
        }
    }
    
    if (allData.length === 0) {
        alert('📊 まだ保存データがありません');
        return;
    }
    
    // 気分ごとの集計
    const moodCount = {};
    const aiCount = {};
    
    allData.forEach(item => {
        moodCount[item.mood] = (moodCount[item.mood] || 0) + 1;
        aiCount[item.aiName] = (aiCount[item.aiName] || 0) + 1;
    });
    
    // HTML生成
    let html = '<h3>🎭 気分別使用回数</h3><div class="stat-bars">';
    
    for (let mood in moodCount) {
        const emoji = getMoodEmoji(mood);
        html += `
            <div class="stat-bar">
                <span>${emoji}</span>
                <div class="bar" style="width: ${moodCount[mood] * 30}px">${moodCount[mood]}回</div>
            </div>
        `;
    }
    
    html += '</div><h3>🤖 AI別保存回数</h3><div class="stat-bars">';
    
    for (let ai in aiCount) {
        html += `
            <div class="stat-bar">
                <span>${ai}</span>
                <div class="bar" style="width: ${aiCount[ai] * 30}px">${aiCount[ai]}回</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    document.getElementById('statsContent').innerHTML = html;
    document.getElementById('statsModal').style.display = 'block';
}

function closeStats() {
    document.getElementById('statsModal').style.display = 'none';
}