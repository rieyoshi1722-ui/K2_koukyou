// 英語(論理・表現) 二学期期末ドリル  Lesson 7-1〜7-3, 8-1, 8-2 (冊子 p.53-67)
var SECTIONS = [
  { id: "7-1q", kind: "q", name: "7-1 不定詞① 問題", page: "p.54-55" },
  { id: "7-1n", kind: "note", name: "7-1 不定詞① 覚えるポイント", page: "p.53" },
  { id: "7-2q", kind: "q", name: "7-2 不定詞② 問題", page: "p.57-58" },
  { id: "7-2n", kind: "note", name: "7-2 不定詞② 覚えるポイント", page: "p.56" },
  { id: "7-3q", kind: "q", name: "7-3 不定詞③ 問題", page: "p.60-61" },
  { id: "7-3n", kind: "note", name: "7-3 不定詞③ 覚えるポイント", page: "p.59" },
  { id: "8-1q", kind: "q", name: "8-1 動名詞① 問題", page: "p.63-64" },
  { id: "8-1n", kind: "note", name: "8-1 動名詞① 覚えるポイント", page: "p.62" },
  { id: "8-2q", kind: "q", name: "8-2 動名詞② 問題", page: "p.66-67" },
  { id: "8-2n", kind: "note", name: "8-2 動名詞② 覚えるポイント", page: "p.65" },
  { id: "v1", kind: "vocab", name: "英単語 英語 → 日本語", page: "Vocabulary" },
  { id: "v2", kind: "vocab", name: "英単語 日本語 → 英語", page: "Vocabulary" }
];
var RAW = [];
function Q(s, p, n, o) { o.s = s; o.p = p; o.n = n; RAW.push(o); }
var DW = "前ページのDialogueと下のVocabularyを参考に、下線部を補って会話を作りなさい。";
var KANA = ["ア", "イ", "ウ", "エ", "オ", "カ"];

// ============ 7-1 不定詞① ============
var I71_1 = "日本語に合うように、[ ]内の動詞を使って英文を完成させなさい。";
Q("7-1q", "p.54", "大問1-(1)", { inst: I71_1, jp: "スポーツを観戦するのはわくわくする。", en: "It is exciting ____.", hint: "[ watch ]", a: "to watch sports", full: "It is exciting to watch sports.", exp: "「It is 〜 to do」の形です。It は「形式主語」で、本当の主語は to watch sports(スポーツを観戦すること)です。" });
Q("7-1q", "p.54", "大問1-(2)", { inst: I71_1, jp: "それはお気の毒に。", en: "I'm ____ that.", hint: "[ hear ]", a: "sorry to hear", full: "I'm sorry to hear that.", exp: "sorry to do =「〜して残念だ」。気持ちの原因を表す to です(副詞的用法)。" });
Q("7-1q", "p.54", "大問1-(3)", { inst: I71_1, jp: "彼女の目標は慈善事業のための資金を集めることだ。", en: "Her aim ____ money for charity.", hint: "[ raise ]", a: "is to raise", full: "Her aim is to raise money for charity.", exp: "「A は〜することだ」は A is to do。to raise ... が補語(C)になる名詞的用法です。" });
Q("7-1q", "p.54", "大問1-(4)", { inst: I71_1, jp: "私たちは彼が元気だと知ってうれしかった。", en: "We were pleased ____ that he was fine.", hint: "[ know ]", a: "to know", full: "We were pleased to know that he was fine.", exp: "pleased to do =「〜してうれしい」。気持ちの原因を表す to 不定詞です。" });
Q("7-1q", "p.54", "大問1-(5)", { inst: I71_1, jp: "私のひいおじいさんは90歳まで生きた。", en: "My great-grandfather lived ____ 90.", hint: "[ be ]", a: "to be", full: "My great-grandfather lived to be 90.", exp: "live to be 〜 =「〜歳まで生きる」。結果を表す不定詞です。" });
Q("7-1q", "p.54", "大問1-(6)", { inst: I71_1, jp: "リサは試験勉強をするために、夜更かしした。", en: "Lisa stayed up late ____ for the test.", hint: "[ prepare ]", a: "to prepare", full: "Lisa stayed up late to prepare for the test.", exp: "「〜するために」は目的を表す不定詞(to do)。prepare for 〜 =〜の準備をする。" });

var I71_2 = "[ ]内から適切な動詞を選び、不定詞に変化させて下線部に入れなさい。";
var B71_2 = "[ be / drink / keep / stay / study / stop ]";
Q("7-1q", "p.54", "大問2-(1)", { inst: I71_2, en: "She grew up ____ a doctor.", hint: B71_2, a: "to be", full: "She grew up to be a doctor.", exp: "grow up to be 〜 =「成長して〜になる」。結果を表す不定詞です。" });
Q("7-1q", "p.54", "大問2-(2)", { inst: I71_2, en: "My father needs ____ smoking.", hint: B71_2, a: "to stop", full: "My father needs to stop smoking.", exp: "need to do =「〜する必要がある」。stop smoking =禁煙する。" });
Q("7-1q", "p.54", "大問2-(3)", { inst: I71_2, en: "Hot drinks help ____ our body warm.", hint: B71_2, a: "to keep", full: "Hot drinks help to keep our body warm.", exp: "help to do =「〜するのに役立つ」。keep A B =AをBの状態に保つ。" });
Q("7-1q", "p.54", "大問2-(4)", { inst: I71_2, en: "There is nothing ____ in the fridge.", hint: B71_2, a: "to drink", full: "There is nothing to drink in the fridge.", exp: "nothing to drink =「飲むものが何もない」。to drink が nothing を後ろから説明しています(形容詞的用法)。" });
Q("7-1q", "p.54", "大問2-(5)", { inst: I71_2, en: "I'm very happy ____ with you.", hint: B71_2, a: "to stay", full: "I'm very happy to stay with you.", exp: "happy to do =「〜してうれしい」。気持ちの原因を表す to です。" });
Q("7-1q", "p.54", "大問2-(6)", { inst: I71_2, en: "____ is necessary for every student.", hint: B71_2, a: "To study", full: "To study is necessary for every student.", exp: "To study(勉強すること)が主語です(名詞的用法)。文の先頭なので T は大文字。" });

var I71_3 = "左右の語句を適切につなぎ、英文を完成させなさい。(前半の文に合う後半を選ぶ)";
var O71_3 = ["to catch the last train.", "to finish today.", "to say such a thing.", "to write down his phone number on.", "to find that I had gone past my stop."];
Q("7-1q", "p.54", "大問3-(1)", { inst: I71_3, en: "We have some work ____", opts: O71_3, ok: 1, full: "We have some work to finish today.(今日終わらせる仕事がある。)", exp: "work を後ろから説明する to です(形容詞的用法)。「終わらせるべき仕事」という意味になります。" });
Q("7-1q", "p.54", "大問3-(2)", { inst: I71_3, en: "I woke up ____", opts: O71_3, ok: 4, full: "I woke up to find that I had gone past my stop.(目を覚ますと、乗り過ごしていた。)", exp: "wake up to find 〜 =「目を覚ますと〜に気づく」。結果を表す不定詞で、おぼえておきたい形です。" });
Q("7-1q", "p.54", "大問3-(3)", { inst: I71_3, en: "I need a piece of paper ____", opts: O71_3, ok: 3, full: "I need a piece of paper to write down his phone number on.(彼の電話番号を書き留める紙が必要だ。)", exp: "a piece of paper を後ろから説明する to。「紙に書く」ので最後の on を忘れない(something to write on と同じ形)。" });
Q("7-1q", "p.54", "大問3-(4)", { inst: I71_3, en: "She hurried to the station ____", opts: O71_3, ok: 0, full: "She hurried to the station to catch the last train.(彼女は終電に乗るために駅へ急いだ。)", exp: "「〜するために」と目的を表す不定詞(副詞的用法)です。" });
Q("7-1q", "p.54", "大問3-(5)", { inst: I71_3, en: "He must be crazy ____", opts: O71_3, ok: 2, full: "He must be crazy to say such a thing.(あんなことを言うなんて、彼は正気じゃないに違いない。)", exp: "判断の理由を表す不定詞「〜するなんて」。人の性質を表す形容詞(crazy)のあとに to が来ます。" });

var I71_4 = "絵に合うように、英文を完成させなさい。";
Q("7-1q", "p.55", "大問4-(1)", { inst: I71_4, img: "p55_1", en: "We decided (____)(____) on a picnic this weekend.", a: "to / go", full: "We decided to go on a picnic this weekend.", exp: "decide to do =「〜することに決める」。絵では「ピクニックに行こう」と言っているので go を使います。" });
Q("7-1q", "p.55", "大問4-(2)", { inst: I71_4, img: "p55_2", en: "They have a coach (____)(____) them.", a: "to / support", full: "They have a coach to support them.", exp: "a coach to support them =「彼らをサポートするコーチ」。coach を後ろから説明する to です(形容詞的用法)。" });
Q("7-1q", "p.55", "大問4-(3)", { inst: I71_4, img: "p55_3", en: "He was disappointed (____)(____) the broken cup.", a: "to / see", full: "He was disappointed to see the broken cup.", exp: "disappointed to do =「〜してがっかりした」。気持ちの原因を表す to です。" });

var I71_5 = "日本語に合うように、( )内の語句を並べかえて英文を完成させなさい。";
Q("7-1q", "p.55", "大問5-(1)", { inst: I71_5, jp: "私は今週末、特にすることがない。", en: "( do / have / I / nothing / to / particular ) this weekend.", a: "I have nothing particular to do", full: "I have nothing particular to do this weekend.", exp: "nothing to do =「することが何もない」。particular(特別な)は nothing のすぐ後ろに置きます: nothing particular to do。" });
Q("7-1q", "p.55", "大問5-(2)", { inst: I71_5, jp: "穴を開ける道具を貸してもらえますか。", en: "Can you lend ( a hole / make / me / a tool / to / with )?", a: "me a tool to make a hole with", full: "Can you lend me a tool to make a hole with?", exp: "lend A B =AにBを貸す。a tool to make a hole with =「穴を開けるための道具」。「〜を使って」の with を最後に置き忘れないこと。" });
Q("7-1q", "p.55", "大問5-(3)", { inst: I71_5, jp: "その会議に出席するために、彼らは朝早くに出発した。", en: "They ( attend / early / the morning / left / in / to ) the meeting.", a: "left early in the morning to attend", full: "They left early in the morning to attend the meeting.", exp: "They のすぐ後ろは動詞 left。early in the morning =朝早くに。「〜するために」の to attend は最後に置きます。", note: "ノートの手書きは「attend the morning early to left in」でした。語順が合っていないので、正しい答えを出しています。" });

var I71_6 = "日本語に合うように、下線部に適切な語句を補いなさい。";
Q("7-1q", "p.55", "大問6-(1)", { inst: I71_6, jp: "先生は私たちに話し合うテーマを与えた。", en: "The teacher gave us a subject ____.", a: "to discuss", full: "The teacher gave us a subject to discuss.", exp: "a subject to discuss =「話し合うためのテーマ」。subject を説明する to です。discuss は後ろに about を付けません(discuss about は×)。" });
Q("7-1q", "p.55", "大問6-(2)", { inst: I71_6, jp: "旅行の計画を立てるのは時には楽しいが、時には大変だ。", en: "____ sometimes fun, but sometimes hard.", a: "Planning a trip is / To plan a trip is", full: "To plan a trip is sometimes fun, but sometimes hard.", exp: "「旅行の計画を立てること」が主語。そのあとに動詞 is が必要です。trip は数えられる名詞(a trip)です。", note: "ノートの手書きは「To plan a travel」でした。動詞の is が足りません。また travel は「a travel」とは言わず、「a trip」が自然です。" });
Q("7-1q", "p.55", "Dialogue Writing", { inst: DW, en: "A: What do you want to be in the future?\nB: I want to be ____.\nA: I hope your dream will come true.", a: "(例) a nurse / a hairstylist / an engineer", full: "I want to be a nurse.(なりたい職業をVocabularyから選ぶ)", exp: "I want to be + 職業。a や an を忘れずに。母音で始まる engineer は an engineer です。" });

// ============ 7-2 不定詞② ============
var I72_1 = "( )内から適切なほうを選びなさい。";
Q("7-2q", "p.57", "大問1-(1)", { inst: I72_1, en: "It's important ____ the goal.", opts: ["reach", "to reach"], ok: 1, full: "It's important to reach the goal.", exp: "It's important to do =「〜することは大切だ」。It は形式主語、to reach the goal が本当の主語です。" });
Q("7-2q", "p.57", "大問1-(2)", { inst: I72_1, en: "It's nice ____ you to invite me to dinner.", opts: ["for", "of"], ok: 1, full: "It's nice of you to invite me to dinner.", exp: "nice は「人の性質」を表す形容詞。人の性質をほめたり注意したりするときは of you to 〜(あなたが〜するなんて)です。" });
Q("7-2q", "p.57", "大問1-(3)", { inst: I72_1, en: "It was hard ____ us to complete the project.", opts: ["for", "of"], ok: 0, full: "It was hard for us to complete the project.", exp: "hard(難しい)は人の性質ではなく、ものごとの様子です。この場合は for us to 〜(私たちが〜するのは)を使います。" });
Q("7-2q", "p.57", "大問1-(4)", { inst: I72_1, en: "I can't decide which dictionary ____.", opts: ["buy", "to buy"], ok: 1, full: "I can't decide which dictionary to buy.", exp: "which + 名詞 + to do =「どの…を〜すべきか」。which dictionary to buy =どの辞書を買うべきか。" });
Q("7-2q", "p.57", "大問1-(5)", { inst: I72_1, en: "He knew how ____ the software.", opts: ["use", "to use"], ok: 1, full: "He knew how to use the software.", exp: "how to do =「〜のしかた」。how to use =使い方。" });

var I72_2 = "[ ]内から適切な動詞を選び、必要に応じて適切な形にして下線部に入れなさい。";
var B72_2 = "[ blow / go / help / hit / serve / win ]";
Q("7-2q", "p.57", "大問2-(1)", { inst: I72_2, en: "Our teacher told us ____ each other.", hint: B72_2, a: "to help", full: "Our teacher told us to help each other.", exp: "tell O to do =「Oに〜するように言う」。" });
Q("7-2q", "p.57", "大問2-(2)", { inst: I72_2, en: "My mother asked me ____ to the supermarket.", hint: B72_2, a: "to go", full: "My mother asked me to go to the supermarket.", exp: "ask O to do =「Oに〜するよう頼む」。" });
Q("7-2q", "p.57", "大問2-(3)", { inst: I72_2, en: "I saw a car ____ a roadside tree.", hint: B72_2, a: "hit", full: "I saw a car hit a roadside tree.", exp: "see O do =「Oが〜するのを見る」。知覚動詞のあとは原形(to は付けません)。" });
Q("7-2q", "p.57", "大問2-(4)", { inst: I72_2, en: "He had the waiter ____ her a glass of water.", hint: B72_2, a: "serve", full: "He had the waiter serve her a glass of water.", exp: "have O do =「Oに〜してもらう」。使役動詞(make / have / let)のあとは原形で、to は付けません。", note: "ノートの手書きは「to serve」でした。have のあとには to を付けないので、serve が正解です。" });
Q("7-2q", "p.57", "大問2-(5)", { inst: I72_2, en: "Did you expect the Tigers ____ the game?", hint: B72_2, a: "to win", full: "Did you expect the Tigers to win the game?", exp: "expect O to do =「Oが〜することを期待する」。" });
Q("7-2q", "p.57", "大問2-(6)", { inst: I72_2, en: "I felt a gentle breeze ____ on my skin.", hint: B72_2, a: "blow", full: "I felt a gentle breeze blow on my skin.", exp: "feel O do =「Oが〜するのを感じる」。知覚動詞のあとは原形です。" });

var I72_3 = "日本語に合うように、[ ]内の語句を使って英文を完成させなさい。";
Q("7-2q", "p.57", "大問3-(1)", { inst: I72_3, jp: "科学技術は私たちがエネルギーを節約することを可能にする。", en: "Technology ____ save energy.", hint: "[ enable / us ]", a: "enables us to", full: "Technology enables us to save energy.", exp: "enable O to do =「Oが〜するのを可能にする」。主語 Technology は三人称単数なので enables です。" });
Q("7-2q", "p.57", "大問3-(2)", { inst: I72_3, jp: "父は私に6時間以上眠るように助言した。", en: "My father ____ sleep more than six hours.", hint: "[ advise / me ]", a: "advised me to", full: "My father advised me to sleep more than six hours.", exp: "advise O to do =「Oに〜するよう勧める」。過去の話なので advised。" });
Q("7-2q", "p.57", "大問3-(3)", { inst: I72_3, jp: "両親は私が留学するのを許してくれた。", en: "My parents ____ study abroad.", hint: "[ allow / me ]", a: "allowed me to", full: "My parents allowed me to study abroad.", exp: "allow O to do =「Oが〜するのを許す」。過去の話なので allowed。" });
Q("7-2q", "p.57", "大問3-(4)", { inst: I72_3, jp: "私は彼がカラオケで歌うのを聞いたことがない。", en: "I've never ____ sing karaoke.", hint: "[ hear / him ]", a: "heard him", full: "I've never heard him sing karaoke.", exp: "hear O do =「Oが〜するのが聞こえる」。I've never のあとは過去分詞 heard。sing は原形です。" });
Q("7-2q", "p.57", "大問3-(5)", { inst: I72_3, jp: "先生は私たちに将来について考えさせた。", en: "Our teacher ____ think about our future.", hint: "[ make / us ]", a: "made us", full: "Our teacher made us think about our future.", exp: "make O do =「Oに〜させる」。過去形は made。think は原形です。" });
Q("7-2q", "p.57", "大問3-(6)", { inst: I72_3, jp: "あなたがいつ戻って来るのか知らせてください。", en: "Please ____ know when you'll come back.", hint: "[ let / me ]", a: "let me", full: "Please let me know when you'll come back.", exp: "let O do =「Oに〜させる(許す)」。let me know =「私に知らせて」は決まり文句です。" });

var I72_4 = "各文の誤りを訂正し、正しい文を書きなさい。";
Q("7-2q", "p.58", "大問4-(1)", { inst: I72_4, en: "It was careless for you to leave the light on all night.", a: "for you → of you", full: "It was careless of you to leave the light on all night.", exp: "careless(不注意な)は人の性質を表す形容詞なので、for you ではなく of you を使います。" });
Q("7-2q", "p.58", "大問4-(2)", { inst: I72_4, en: "Lucy's mother told Lucy clean her room, but she didn't.", a: "clean → to clean", full: "Lucy's mother told Lucy to clean her room, but she didn't.", exp: "tell O to do。Lucy のあとに to が必要です。" });
Q("7-2q", "p.58", "大問4-(3)", { inst: I72_4, en: "I saw her to go out five minutes ago.", a: "to go → go", full: "I saw her go out five minutes ago.", exp: "see O do。知覚動詞のあとは原形で、to は付けません。" });
Q("7-2q", "p.58", "大問4-(4)", { inst: I72_4, en: "She decided which to buy dress.", a: "which to buy dress → which dress to buy", full: "She decided which dress to buy.", exp: "which + 名詞 + to do。which と dress は続けて置きます。" });

var I72_5 = "日本語に合うように、( )内の語句を並べかえて英文を完成させなさい。";
Q("7-2q", "p.58", "大問5-(1)", { inst: I72_5, jp: "誰かが私の名前を呼ぶのが聞こえた。", en: "( my / call / someone / name / heard / I ).", a: "I heard someone call my name", full: "I heard someone call my name.", exp: "hear O do。someone が O、call が原形、my name は call の目的語です。" });
Q("7-2q", "p.58", "大問5-(2)", { inst: I72_5, jp: "あなたに会議に出席していただきたい。", en: "( you / like / attend / would / I / to ) the meeting.", a: "I would like you to attend", full: "I would like you to attend the meeting.", exp: "would like O to do =「Oに〜してほしい」。want より丁寧な言い方です。" });
Q("7-2q", "p.58", "大問5-(3)", { inst: I72_5, jp: "母親たちは子どもたちを公園で遊ばせた。", en: "Mothers ( in / let / park / play / the / their children ).", a: "let their children play in the park", full: "Mothers let their children play in the park.", exp: "let O do =「Oに〜させる」。play のあとに場所 in the park を置きます。" });

var I72_6 = "日本語に合うように、下線部に適切な語句を補いなさい。";
Q("7-2q", "p.58", "大問6-(1)", { inst: I72_6, jp: "マイクが体育館に入るのを見た。", en: "I ____ the gym.", a: "saw Mike enter (または saw Mike go into)", full: "I saw Mike enter the gym.", exp: "see O do。enter は「〜に入る」で、in や into は付けません。go into the gym でもOKです。" });
Q("7-2q", "p.58", "大問6-(2)", { inst: I72_6, jp: "トムはピアノの発表会に何を着て行くべきかわからなかった。", en: "Tom had no idea ____ to the piano recital.", a: "what to wear", full: "Tom had no idea what to wear to the piano recital.", exp: "what to do =「何を〜すべきか」。what to wear =何を着るべきか(疑問詞 + to不定詞)。" });
Q("7-2q", "p.58", "Dialogue Writing", { inst: DW, en: "A: I want you to join the ____.\nB: Sorry, I can't. I've already joined the ____.\nA: That's OK. Thanks, anyway.", a: "(例) drama club / choir", full: "I want you to join the drama club. / I've already joined the choir.", exp: "I want you to 〜 =「あなたに〜してほしい」。部活名は Vocabulary から選べます。join のあとに in は付けません。" });

// ============ 7-3 不定詞③ ============
var I73_1 = "( )内から適切なほうを選びなさい。";
Q("7-3q", "p.60", "大問1-(1)", { inst: I73_1, en: "The doctor told me ____ any exercise for two weeks.", opts: ["to do not", "not to do"], ok: 1, full: "The doctor told me not to do any exercise for two weeks.", exp: "不定詞の否定形は not to do。not は to の前に置きます。" });
Q("7-3q", "p.60", "大問1-(2)", { inst: I73_1, en: "He seems to ____ nervous recently.", opts: ["be", "have been"], ok: 1, full: "He seems to have been nervous recently.", exp: "recently(最近)は、今までの話です。seems(今)より前のことなので to have been を使います。" });
Q("7-3q", "p.60", "大問1-(3)", { inst: I73_1, en: "Kittens need ____ care of by their mothers.", opts: ["to be taken", "to take"], ok: 0, full: "Kittens need to be taken care of by their mothers.", exp: "take care of 〜(〜の世話をする)の受け身は be taken care of。子ねこは世話を「される」側なので to be taken です。" });
Q("7-3q", "p.60", "大問1-(4)", { inst: I73_1, en: "My sister seems ____ about her friend.", opts: ["to thinking", "to be thinking"], ok: 1, full: "My sister seems to be thinking about her friend.", exp: "進行形の不定詞は to be + doing です(to thinking は×)。「〜しているようだ」の意味。" });
Q("7-3q", "p.60", "大問1-(5)", { inst: I73_1, en: "She seemed to ____ fine when I met her.", opts: ["be", "have been"], ok: 0, full: "She seemed to be fine when I met her.", exp: "「そう見えた」のも「会った」のも同じ時なので、to + 原形(be)です。" });

var I73_2 = "左右の語句を適切につなぎ、英文を完成させなさい。(前半の文に合う後半を選ぶ)";
var O73_2 = ["for me to go out without my coat.", "in order to stay healthy.", "to teach me how to answer the question.", "to be left alone.", "to be studying in his room.", "to be used."];
Q("7-3q", "p.60", "大問2-(1)", { inst: I73_2, en: "He gets up early ____", opts: O73_2, ok: 1, full: "He gets up early in order to stay healthy.(彼は健康でいるために早く起きる。)", exp: "in order to do =「〜するために」(目的)。" });
Q("7-3q", "p.60", "大問2-(2)", { inst: I73_2, en: "I sometimes want ____", opts: O73_2, ok: 3, full: "I sometimes want to be left alone.(ときどき一人にしておいてほしい。)", exp: "want to be left alone =「一人にしておかれたい」。受け身の不定詞(to be + 過去分詞)です。" });
Q("7-3q", "p.60", "大問2-(3)", { inst: I73_2, en: "My brother seems ____", opts: O73_2, ok: 4, full: "My brother seems to be studying in his room.(兄は部屋で勉強しているようだ。)", exp: "seems to be studying =「勉強しているようだ」。進行形の不定詞です。" });
Q("7-3q", "p.60", "大問2-(4)", { inst: I73_2, en: "He was kind enough ____", opts: O73_2, ok: 2, full: "He was kind enough to teach me how to answer the question.(彼は親切にも、その問題の答え方を教えてくれた。)", exp: "形容詞 + enough to do =「〜するほど…」「…なので〜する」。" });
Q("7-3q", "p.60", "大問2-(5)", { inst: I73_2, en: "This data is too old ____", opts: O73_2, ok: 5, full: "This data is too old to be used.(このデータは古すぎて使えない。)", exp: "too + 形容詞 + to do =「…すぎて〜できない」。データは「使われる」側なので to be used です。" });
Q("7-3q", "p.60", "大問2-(6)", { inst: I73_2, en: "It was warm enough ____", opts: O73_2, ok: 0, full: "It was warm enough for me to go out without my coat.(コートなしで外出できるほど暖かかった。)", exp: "enough to do の前に for me を置くと「私が〜するのに十分」。for + 人 + to do は不定詞の意味上の主語です。" });

var I73_3 = "日本語に合うように、[ ]内の語を使って英文を完成させなさい。";
Q("7-3q", "p.60", "大問3-(1)", { inst: I73_3, jp: "彼の新しいアルバムがまもなくリリースされると期待している。", en: "I expect his new album to ____ soon.", hint: "[ release ]", a: "be released", full: "I expect his new album to be released soon.", exp: "アルバムは「リリースされる」側です。受け身の不定詞 to be + 過去分詞を使います。" });
Q("7-3q", "p.60", "大問3-(2)", { inst: I73_3, jp: "約束を忘れないように気を付けなさい。", en: "Take care ____ the appointment.", hint: "[ forget ]", a: "not to forget", full: "Take care not to forget the appointment.", exp: "take care not to do =「〜しないように気を付ける」。否定の not は to の前です。" });
Q("7-3q", "p.60", "大問3-(3)", { inst: I73_3, jp: "弟は自分の部屋を与えてもらってうれしかった。", en: "My brother was happy ____ his own room.", hint: "[ give ]", a: "to be given", full: "My brother was happy to be given his own room.", exp: "弟は部屋を「与えられる」側。happy to be given =「与えてもらってうれしい」。" });
Q("7-3q", "p.60", "大問3-(4)", { inst: I73_3, jp: "その植物は毎日水をやる必要がない。", en: "The plant doesn't need ____ every day.", hint: "[ water ]", a: "to be watered", full: "The plant doesn't need to be watered every day.", exp: "植物は水を「やられる」側なので to be watered(受け身の不定詞)です。" });
Q("7-3q", "p.60", "大問3-(5)", { inst: I73_3, jp: "その老婦人はタクシーを待っているようだった。", en: "The old woman seemed ____ for a taxi.", hint: "[ wait ]", a: "to be waiting", full: "The old woman seemed to be waiting for a taxi.", exp: "seemed to be doing =「〜しているようだった」。進行形の不定詞です。" });
Q("7-3q", "p.60", "大問3-(6)", { inst: I73_3, jp: "そのフルーツはあまりにも固すぎてそのナイフでは切れなかった。", en: "The fruit was too hard ____ with the knife.", hint: "[ cut ]", a: "to cut (to be cut でもOK)", full: "The fruit was too hard to cut with the knife.", exp: "too + 形容詞 + to do =「…すぎて〜できない」。to cut with the knife =「そのナイフで切るには」。受け身の to be cut でも正しい文です。" });
Q("7-3q", "p.60", "大問3-(7)", { inst: I73_3, jp: "この問題を解決するために、私たちは行動を起こすべきだ。", en: "We should take action in ____ this problem.", hint: "[ solve ]", a: "order to solve", full: "We should take action in order to solve this problem.", exp: "in order to do =「〜するために」(目的)。" });

var I73_4 = "絵に合うように、[ ]内の語を使って英文を完成させなさい。";
Q("7-3q", "p.61", "大問4-(1)", { inst: I73_4, img: "p61_1", en: "My dog seems ____ my words.", hint: "[ understand ]", a: "to understand", full: "My dog seems to understand my words.", exp: "絵は「今」の話です。seems(今)と同じ時なので to + 原形(to understand)です。" });
Q("7-3q", "p.61", "大問4-(2)", { inst: I73_4, img: "p61_2", en: "He seems ____ all the cookies.", hint: "[ eat ]", a: "to have eaten", full: "He seems to have eaten all the cookies.", exp: "クッキーを食べたのは「過去」で、そう思うのは「今」。seems より前のことなので to have + 過去分詞(to have eaten)です。" });
Q("7-3q", "p.61", "大問4-(3)", { inst: I73_4, img: "p61_3", en: "The temple is said ____ a thousand years ago.", hint: "[ build ]", a: "to have been built", full: "The temple is said to have been built a thousand years ago.", exp: "建てられたのは1000年前(said より前)。しかも寺は「建てられる」側なので to have been built(完了形 + 受け身)です。" });

var I73_5 = "日本語に合うように、( )内の語句を並べかえて英文を完成させなさい。";
Q("7-3q", "p.61", "大問5-(1)", { inst: I73_5, jp: "政府は環境問題について議論していると言われている。", en: "The government ( be / is / to / said / discussing / environmental issues ).", a: "is said to be discussing environmental issues", full: "The government is said to be discussing environmental issues.", exp: "A is said to do =「Aは〜と言われている」。「議論している」は進行形の不定詞 to be discussing です。" });
Q("7-3q", "p.61", "大問5-(2)", { inst: I73_5, jp: "そのアメリカ人は話すのがあまりに速すぎて、私には理解できない。", en: "The American speaks ( fast / for / me / understand / to / too ).", a: "too fast for me to understand", full: "The American speaks too fast for me to understand.", exp: "too + 形容詞[副詞] + for 人 + to do =「人が〜するには…すぎる」。" });
Q("7-3q", "p.61", "大問5-(3)", { inst: I73_5, jp: "都市部で停電があったようだ。", en: "There ( seems / been / in / have / a blackout / to ) the city.", a: "seems to have been a blackout in", full: "There seems to have been a blackout in the city.", exp: "There seems to have been 〜 =「〜があったようだ」。停電は「過去」のことなので to have been です。" });

var I73_6 = "日本語に合うように、下線部に適切な語句を補いなさい。";
Q("7-3q", "p.61", "大問6-(1)", { inst: I73_6, jp: "父に私の部屋に入らないように頼んだ。", en: "I asked my father ____.", a: "not to enter my room", full: "I asked my father not to enter my room.", exp: "ask O to do の否定は ask O not to do。enter は後ろに in を付けず、そのまま my room を置きます。" });
Q("7-3q", "p.61", "大問6-(2)", { inst: I73_6, jp: "彼女はその車を買うのに十分なほど金持ちだ。", en: "She is ____ the car.", a: "rich enough to buy", full: "She is rich enough to buy the car.", exp: "形容詞 + enough to do =「〜するほど…」。enough は形容詞の「後ろ」に置きます。" });
Q("7-3q", "p.61", "Dialogue Writing", { inst: DW, en: "A: ____ seems to ____.\nB: Really? I'll ask him [her] if he [she] is OK.\nA: I think he [she] should see a doctor.", a: "(例) Tom / have a fever", full: "Tom seems to have a fever.", exp: "「人 + seems to + 動詞」の形。Vocabulary の have a fever(熱がある)、have a headache(頭痛がする)などを使います。" });

// ============ 8-1 動名詞① ============
var I81_1 = "各文の誤りに下線を引き、その下に正しい答えを書きなさい。";
Q("8-1q", "p.63", "大問1-(1)", { inst: I81_1, jp: "外国語を学ぶのは興味深い。", en: "Study foreign languages is interesting.", a: "Study → Studying", full: "Studying foreign languages is interesting.", exp: "主語になる動詞は動名詞(〜ing)にします。Studying foreign languages(外国語を学ぶこと)が主語です。" });
Q("8-1q", "p.63", "大問1-(2)", { inst: I81_1, jp: "彼女はギターを演奏することが得意だ。", en: "She is good at to play the guitar.", a: "to play → playing", full: "She is good at playing the guitar.", exp: "前置詞(at)のあとは動名詞です。to 不定詞は置けません。be good at doing =「〜することが得意だ」。" });
Q("8-1q", "p.63", "大問1-(3)", { inst: I81_1, jp: "彼が私をからかうのは好きではない。", en: "I don't like he making fun of me.", a: "he → him", full: "I don't like him making fun of me.", exp: "動名詞の意味上の主語は、代名詞なら目的格(him)か所有格(his)にします。he は×です。" });
Q("8-1q", "p.63", "大問1-(4)", { inst: I81_1, jp: "時間どおりに来なくてすみません。", en: "I'm sorry for coming not on time.", a: "coming not → not coming", full: "I'm sorry for not coming on time.", exp: "動名詞の否定形は not + doing。not は動名詞の直前に置きます。" });

var I81_2 = "[ ]内から動詞を選び、適切な形にして下線部に入れなさい。";
var B81_2 = "[ make / pass / read / laugh / skip ]";
Q("8-1q", "p.63", "大問2-(1)", { inst: I81_2, en: "I'm sure of ____ the exam next year.", hint: B81_2, a: "passing", full: "I'm sure of passing the exam next year.", exp: "前置詞 of のあとは動名詞。be sure of doing =「〜することを確信している」。" });
Q("8-1q", "p.63", "大問2-(2)", { inst: I81_2, en: "Kate was afraid of ____ at by others.", hint: B81_2, a: "being laughed", full: "Kate was afraid of being laughed at by others.", exp: "laugh at 〜(〜を笑う)の受け身は be laughed at。前置詞 of のあとなので being laughed (at) です。" });
Q("8-1q", "p.63", "大問2-(3)", { inst: I81_2, en: "____ meals is bad for your health.", hint: B81_2, a: "Skipping", full: "Skipping meals is bad for your health.", exp: "文の主語になる動名詞。skip meals =食事を抜く。" });
Q("8-1q", "p.63", "大問2-(4)", { inst: I81_2, en: "My favorite relaxation is ____ detective stories.", hint: B81_2, a: "reading", full: "My favorite relaxation is reading detective stories.", exp: "補語(C)になる動名詞。「推理小説を読むこと」。" });
Q("8-1q", "p.63", "大問2-(5)", { inst: I81_2, en: "He admitted ____ a mistake.", hint: B81_2, a: "making", full: "He admitted making a mistake.", exp: "admit は動名詞を目的語にする動詞です。admit doing =「〜したことを認める」。make a mistake =まちがいをする。" });

var I81_3 = "日本語に合うように、[ ]内の語句を使って英文を完成させなさい。";
Q("8-1q", "p.63", "大問3-(1)", { inst: I81_3, jp: "教授は短い休憩をとった後で再び講義を始めた。", en: "The professor started his lecture again ____ a short break.", hint: "[ after / take ]", a: "after taking", full: "The professor started his lecture again after taking a short break.", exp: "前置詞 after のあとは動名詞。take a break =休憩をとる。" });
Q("8-1q", "p.63", "大問3-(2)", { inst: I81_3, jp: "私はエミリーがスピーチすることを心配している。", en: "I'm anxious about ____ a speech.", hint: "[ Emily / give ]", a: "Emily giving", full: "I'm anxious about Emily giving a speech.", exp: "動名詞の意味上の主語(Emily)は、動名詞の前に置きます。Emily's giving でもOKです。" });
Q("8-1q", "p.63", "大問3-(3)", { inst: I81_3, jp: "彼女はヨーロッパに行くのを楽しみにしている。", en: "She is ____ to Europe.", hint: "[ look forward to / go ]", a: "looking forward to going", full: "She is looking forward to going to Europe.", exp: "look forward to doing =「〜することを楽しみに待つ」。この to は前置詞なので、あとは動名詞(going)です。" });
Q("8-1q", "p.63", "大問3-(4)", { inst: I81_3, jp: "彼が料理について文句を言うのが好きではない。", en: "I don't like ____ about the dishes.", hint: "[ him / complain ]", a: "him complaining", full: "I don't like him complaining about the dishes.", exp: "意味上の主語(him)+ 動名詞(complaining)。complain about 〜 =〜について文句を言う。" });

var I81_4 = "絵に合うように、英文を完成させなさい。";
Q("8-1q", "p.64", "大問4-(1)", { inst: I81_4, img: "p64", en: "My brother likes (____)(____).", a: "reading / books", full: "My brother likes reading books.", exp: "like doing =「〜することが好き」。絵では男の子が本を読んでいます。" });
Q("8-1q", "p.64", "大問4-(2)", { inst: I81_4, img: "p64", en: "My sister's favorite pastime is (____)(____) games.", a: "playing / video", full: "My sister's favorite pastime is playing video games.", exp: "補語になる動名詞。favorite pastime =いちばんの気晴らし。絵では女の子がテレビゲームをしています。" });
Q("8-1q", "p.64", "大問4-(3)", { inst: I81_4, img: "p64", en: "My father enjoys (____)(____) music.", a: "listening / to", full: "My father enjoys listening to music.", exp: "enjoy は動名詞を目的語にします。listen to music の to を忘れないように。" });

var I81_5 = "日本語に合うように、( )内の語句を並べかえて英文を完成させなさい。";
Q("8-1q", "p.64", "大問5-(1)", { inst: I81_5, jp: "彼女はキャプテンに選ばれて満足だった。", en: "She ( chosen / being / as captain / satisfied / with / was ).", a: "was satisfied with being chosen as captain", full: "She was satisfied with being chosen as captain.", exp: "前置詞 with のあとなので being + 過去分詞(受け身の動名詞)。choose A as B =AをBに選ぶ。" });
Q("8-1q", "p.64", "大問5-(2)", { inst: I81_5, jp: "窓を開けても構いませんか。", en: "( my / you / opening / mind / the window / would )?", a: "Would you mind my opening the window?", full: "Would you mind my opening the window?", exp: "Would you mind doing? =「〜してもよいですか/〜してくれませんか」。意味上の主語 my を動名詞の前に置くと「私が〜しても」になります。" });
Q("8-1q", "p.64", "大問5-(3)", { inst: I81_5, jp: "私は彼女のチームがその試合に勝つと確信している。", en: "I'm ( her / of / sure / team / the game / winning ).", a: "sure of her team winning the game", full: "I'm sure of her team winning the game.", exp: "be sure of doing =「〜を確信している」。her team(意味上の主語)+ winning the game。" });

var I81_6 = "日本語に合うように、下線部に適切な語句を補いなさい。";
Q("8-1q", "p.64", "大問6-(1)", { inst: I81_6, jp: "さよならも言わずに、その男性は立ち去った。", en: "The man went away without ____.", a: "saying goodbye", full: "The man went away without saying goodbye.", exp: "前置詞 without のあとは動名詞です。" });
Q("8-1q", "p.64", "大問6-(2)", { inst: I81_6, jp: "私は長時間歩くのに慣れている。", en: "I'm ____ for long hours.", a: "used to walking", full: "I'm used to walking for long hours.", exp: "be used to doing =「〜することに慣れている」。この to は前置詞なので walking。(used to do「昔〜したものだ」と区別しよう)" });
Q("8-1q", "p.64", "Dialogue Writing", { inst: DW, en: "A: I'm used to ____.\nB: Oh, really?\nA: How about you?", a: "(例) getting up early / walking a dog", full: "I'm used to walking a dog.", exp: "I'm used to + 〜ing。Vocabulary の do housework や walk a dog などを〜ing の形にして使います。" });

// ============ 8-2 動名詞② ============
var I82_1 = "[ ]の動詞を適切な形にして下線部に入れなさい。ただし、それぞれ1回しか使えません。";
var B82_1 = "[ know / say / be / talk / have ]";
Q("8-2q", "p.66", "大問1-(1)", { inst: I82_1, en: "They enjoyed ____ a barbecue.", hint: B82_1, a: "having", full: "They enjoyed having a barbecue.", exp: "enjoy は動名詞を目的語にします。have a barbecue =バーベキューをする。" });
Q("8-2q", "p.66", "大問1-(2)", { inst: I82_1, en: "She is afraid of ____ talked to by strangers.", hint: B82_1, a: "being", full: "She is afraid of being talked to by strangers.", exp: "talk to 〜の受け身は be talked to。前置詞 of のあとなので being talked to です。" });
Q("8-2q", "p.66", "大問1-(3)", { inst: I82_1, en: "There is no ____ who will read your blog.", hint: B82_1, a: "knowing", full: "There is no knowing who will read your blog.", exp: "There is no doing =「〜することはできない」。There is no knowing who ... =誰が読むかわからない。" });
Q("8-2q", "p.66", "大問1-(4)", { inst: I82_1, en: "It is no use ____ to her now. She is totally upset.", hint: B82_1, a: "talking", full: "It is no use talking to her now. She is totally upset.", exp: "It is no use doing =「〜しても無駄だ」。" });
Q("8-2q", "p.66", "大問1-(5)", { inst: I82_1, en: "I apologized to him for ____ such a thing.", hint: B82_1, a: "saying", full: "I apologized to him for saying such a thing.", exp: "前置詞 for のあとは動名詞。apologize to A for doing =「〜したことをAにわびる」。", note: "ノートの手書きは「Said」でした。for のあとは say の〜ing形、saying が正しいです。" });

var I82_2 = "( )内から適切なほうを選びなさい。";
Q("8-2q", "p.66", "大問2-(1)", { inst: I82_2, en: "The teacher scolded us, but we couldn't stop ____.", opts: ["talking", "to talk"], ok: 0, full: "The teacher scolded us, but we couldn't stop talking.", exp: "stop doing =「〜するのをやめる」。stop to do だと「〜するために立ち止まる」になります。" });
Q("8-2q", "p.66", "大問2-(2)", { inst: I82_2, en: "Would you mind ____ five minutes?", opts: ["waiting", "to wait"], ok: 0, full: "Would you mind waiting five minutes?", exp: "mind は動名詞を目的語にします。" });
Q("8-2q", "p.66", "大問2-(3)", { inst: I82_2, en: "She decided ____ every morning to stay healthy.", opts: ["jogging", "to jog"], ok: 1, full: "She decided to jog every morning to stay healthy.", exp: "decide は不定詞(to do)を目的語にします。" });
Q("8-2q", "p.66", "大問2-(4)", { inst: I82_2, en: "I finished ____ a letter to Bill.", opts: ["writing", "to write"], ok: 0, full: "I finished writing a letter to Bill.", exp: "finish は動名詞を目的語にします。" });
Q("8-2q", "p.66", "大問2-(5)", { inst: I82_2, en: "Students are expected ____ to school by 8:30.", opts: ["coming", "to come"], ok: 1, full: "Students are expected to come to school by 8:30.", exp: "expect O to do の受け身。be expected to do =「〜することが期待されている」。" });
Q("8-2q", "p.66", "大問2-(6)", { inst: I82_2, en: "He refused ____ personal questions.", opts: ["answering", "to answer"], ok: 1, full: "He refused to answer personal questions.", exp: "refuse は不定詞を目的語にします。" });
Q("8-2q", "p.66", "大問2-(7)", { inst: I82_2, en: "My grandmother never fails ____ me on my birthday.", opts: ["calling", "to call"], ok: 1, full: "My grandmother never fails to call me on my birthday.", exp: "fail to do =「〜し損なう」。never fails to do =「必ず〜する」。" });

var I82_3 = "日本語に合うように、[ ]内の語句を使って英文を完成させなさい。";
Q("8-2q", "p.66", "大問3-(1)(a)", { inst: I82_3, jp: "幼い頃、オーストラリアに行ったことを覚えている。", en: "I ____ to Australia when I was little.", hint: "[ remember / go ]", a: "remember going", full: "I remember going to Australia when I was little.", exp: "remember doing =「〜したことを覚えている」(過去のこと)。" });
Q("8-2q", "p.66", "大問3-(1)(b)", { inst: I82_3, jp: "寝る前に忘れずに窓の鍵を掛けなさい。", en: "____ the window before you go to bed.", hint: "[ remember / lock ]", a: "Remember to lock", full: "Remember to lock the window before you go to bed.", exp: "remember to do =「忘れずに〜する」(これからのこと)。" });
Q("8-2q", "p.66", "大問3-(2)(a)", { inst: I82_3, jp: "リサはパーティーでトムに会ったことを忘れていた。", en: "Lisa ____ Tom at the party.", hint: "[ forget / meet ]", a: "forgot meeting", full: "Lisa forgot meeting Tom at the party.", exp: "forget doing =「〜したことを忘れる」(過去のこと)。" });
Q("8-2q", "p.66", "大問3-(2)(b)", { inst: I82_3, jp: "食料品店で卵を買うのを忘れないように。", en: "Don't ____ eggs at the grocery store.", hint: "[ forget / buy ]", a: "forget to buy", full: "Don't forget to buy eggs at the grocery store.", exp: "forget to do =「〜するのを忘れる」(これからすること)。「これから買うのを忘れないで」なので to buy です。", note: "ノートの手書きは「forget buying」でした。「これから買う」話なので、forget to buy が正しいです。" });
Q("8-2q", "p.66", "大問3-(3)(a)", { inst: I82_3, jp: "その箱を動かそうとしたが、動かせなかった。", en: "I ____ the box, but I couldn't.", hint: "[ try / move ]", a: "tried to move", full: "I tried to move the box, but I couldn't.", exp: "try to do =「〜しようとする(努力する)」。" });
Q("8-2q", "p.66", "大問3-(3)(b)", { inst: I82_3, jp: "そのピザを試しに食べてみたら、おいしかった。", en: "I ____ the pizza and I found it delicious.", hint: "[ try / eat ]", a: "tried eating", full: "I tried eating the pizza and I found it delicious.", exp: "try doing =「ためしに〜してみる」。" });

var I82_4 = "各文の誤りを訂正し、正しい文を書きなさい。";
Q("8-2q", "p.67", "大問4-(1)", { inst: I82_4, en: "It's no used asking him for help.", a: "used → use", full: "It's no use asking him for help.", exp: "It is no use doing =「〜しても無駄だ」。used ではなく use です。" });
Q("8-2q", "p.67", "大問4-(2)", { inst: I82_4, en: "She regretted no buying that skirt.", a: "no → not", full: "She regretted not buying that skirt.", exp: "動名詞の否定は not + doing。regret doing =「〜したことを後悔する」。" });
Q("8-2q", "p.67", "大問4-(3)", { inst: I82_4, en: "My father gave up to smoke.", a: "to smoke → smoking", full: "My father gave up smoking.", exp: "give up は動名詞を目的語にします(禁煙をあきらめた、ではなく「タバコをやめた」)。" });
Q("8-2q", "p.67", "大問4-(4)", { inst: I82_4, en: "There is not saying when they will return.", a: "not → no", full: "There is no saying when they will return.", exp: "There is no doing =「〜することはできない」。not ではなく no です。" });

var I82_5 = "日本語に合うように、( )内の語を並べかえて英文を完成させなさい。";
Q("8-2q", "p.67", "大問5-(1)", { inst: I82_5, jp: "メアリーは子どもたちに英語を教えるのが大好きだ。", en: "Mary ( children / teach / loves / English / to / to ).", a: "loves to teach English to children", full: "Mary loves to teach English to children.", exp: "love は不定詞も動名詞も目的語にできます。to が2つ: 「loves to teach」の不定詞の to と、「English to children」(子どもたちに)の前置詞 to です。" });
Q("8-2q", "p.67", "大問5-(2)", { inst: I82_5, jp: "彼女は主役を演じたことを誇りに思っている。", en: "( having / is / played / proud / of / she ) the leading role.", a: "She is proud of having played", full: "She is proud of having played the leading role.", exp: "be proud of doing =「〜を誇りに思う」。「演じた」のは今より前なので、having + 過去分詞(having played)にします。" });
Q("8-2q", "p.67", "大問5-(3)", { inst: I82_5, jp: "私は何も知らないふりをした。", en: "( anything / I / know / not / pretended / to ).", a: "I pretended not to know anything", full: "I pretended not to know anything.", exp: "pretend は不定詞を目的語にします。否定は not to know(to の前に not)。" });

var I82_6 = "日本語に合うように、下線部に適切な語句を補いなさい。";
Q("8-2q", "p.67", "大問6-(1)", { inst: I82_6, jp: "本当のことを言わなかったことを恥じている。", en: "I'm ashamed of ____ the truth.", a: "not having told (not telling でもOK)", full: "I'm ashamed of not having told the truth.", exp: "前置詞 of のあとは動名詞。否定は not + doing。「言わなかった」のは今より前なので not having told です。" });
Q("8-2q", "p.67", "大問6-(2)", { inst: I82_6, jp: "あなた方全員に歓迎してもらったことを決して忘れない。", en: "I will never ____ by all of you.", a: "forget being welcomed", full: "I will never forget being welcomed by all of you.", exp: "forget doing =「〜したことを忘れる」。「歓迎された」と受け身なので being welcomed です。" });
Q("8-2q", "p.67", "Dialogue Writing", { inst: DW, en: "A: Do you like to ____?\nB: Yes, I do.\nA: Why don't we do it together this weekend?", a: "(例) play baseball / play the guitar", full: "Do you like to play baseball?", exp: "like to do の to のあとは動詞の原形。Vocabulary の動作(play baseball など)を使います。" });

// ============ 英単語 (Vocabulary) ============
var VOCAB = [
  ["7-1 p.55", [["office worker", "会社員"], ["bank clerk", "銀行員"], ["firefighter", "消防士"], ["public employee / public [civil] servant", "公務員"], ["(police) officer", "警官"], ["(nursing) care worker", "介護福祉士"], ["hairstylist / hairdresser", "美容師"], ["nurse", "看護師"], ["pharmacist", "薬剤師"], ["cook", "調理師"], ["flight attendant", "客室乗務員"], ["engineer", "技師"], ["dentist", "歯科医"]]],
  ["7-2 p.58", [["drama club", "演劇部"], ["broadcasting club", "放送部"], ["tea ceremony club", "茶道部"], ["calligraphy club", "書道部"], ["flower arrangement club", "華道部"], ["astronomy club", "天文部"], ["choir", "合唱部"], ["table tennis team", "卓球部"], ["track and field team", "陸上部"], ["swim [swimming] team", "水泳部"], ["gymnastics team", "体操部"]]],
  ["7-3 p.61", [["have a fever", "熱がある"], ["have a sore throat", "のどが痛い"], ["have a headache", "頭痛がする"], ["have a stomachache", "お腹が痛い"], ["have a toothache", "歯が痛い"], ["feel dizzy", "めまいがする"], ["have sore muscles", "筋肉痛になる"], ["have no appetite", "食欲がない"], ["feel sick / ill", "気分が悪い"]]],
  ["8-1 p.64", [["work out", "運動する"], ["train early in the morning", "朝練をする"], ["do housework", "家事をする"], ["iron", "アイロンをかける"], ["do [wash] the dishes", "皿を洗う"], ["do the washing [laundry]", "洗濯をする"], ["cook [make] a meal", "食事を作る"], ["walk a dog", "犬の散歩をする"], ["take care of a cat", "猫の世話をする"], ["separate the trash", "ごみを分別する"]]],
  ["8-2 p.67", [["play baseball", "野球をする"], ["volleyball", "バレーボール"], ["table tennis / ping-pong", "卓球"], ["rugby", "ラグビー"], ["play cards", "トランプをする"], ["play a video game", "テレビゲームをする"], ["play the guitar", "ギターを弾く"], ["sing in a chorus", "コーラスで歌う"], ["take a picture", "写真を撮る"], ["chat with a friend", "友達とおしゃべりする"]]]
];
VOCAB.forEach(function (g) {
  var n = g[0].split(" ")[0], p = g[0].split(" ")[1];
  g[1].forEach(function (w) {
    RAW.push({ s: "v1", p: p, n: "Lesson " + n, inst: "この英語の意味は?", en: w[0], a: w[1] });
    RAW.push({ s: "v2", p: p, n: "Lesson " + n, inst: "英語で言うと?", jp: w[1], a: w[0] });
  });
});
