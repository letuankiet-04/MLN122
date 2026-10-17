import { KnowledgeVideo } from '../types/video';

export const KNOWLEDGE_VIDEOS: KnowledgeVideo[] = [
  {
    id: 'video-hth',
    title: 'Công thức lưu thông hàng hóa H – T – H',
    subtitle: 'Bản chất trao đổi hàng hóa giản đơn và mục đích thỏa mãn giá trị sử dụng',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 150,
    formattedDuration: '02:30',
    badgeText: '🎬 Video kiến thức – Xem nhanh 2.5 phút',
    difficulty: 'Cơ bản',
    thumbnailEmoji: '🌾⇄💰⇄🍞',
    keyTakeaways: [
      'Lưu thông hàng hóa giản đơn bắt đầu bằng Hàng và kết thúc bằng Hàng (H – T – H).',
      'Tiền tệ ở đây chỉ đóng vai trò phương tiện trung gian để thúc đẩy quá trình trao đổi.',
      'Mục đích cuối cùng của hành vi là Giá trị sử dụng (tiêu dùng một sản phẩm khác cần thiết).',
      'Quá trình có giới hạn tự nhiên: chấm dứt ngay khi người bán nhận được món hàng họ cần.'
    ],
    keyTerms: [
      'lưu thông hàng hóa',
      'giá trị sử dụng',
      'tiền tệ',
      'hàng hóa giản đơn'
    ],
    formulaDiagram: {
      title: 'Sơ đồ vận động H – T – H',
      code: 'H (Hàng 1) ──[Bán]──> T (Tiền) ──[Mua]──> H (Hàng 2)',
      explanation: 'Hai cực Hàng 1 và Hàng 2 có cùng giá trị trao đổi nhưng khác nhau về giá trị sử dụng (ví dụ: bán Lúa lấy Tiền rồi mua Vải để may mặc).',
      comparison: {
        leftTitle: 'Điểm khởi đầu & Kết thúc',
        leftContent: 'Bắt đầu từ Hàng hóa, kết thúc cũng bằng Hàng hóa.',
        rightTitle: 'Mục đích vận động',
        rightContent: 'Thỏa mãn nhu cầu tiêu dùng cụ thể (Giá trị sử dụng).'
      }
    },
    scenes: [
      {
        id: 'hth-s1',
        sceneNumber: 1,
        title: 'Concept: Nhu cầu trao đổi trong xã hội',
        type: 'concept',
        startTime: 0,
        endTime: 30,
        narration: 'Trong nền kinh tế hàng hóa giản đơn, người nông dân mang thóc lúa ra chợ không phải để tích trữ tiền, mà để đổi lấy những thứ gia đình họ thiếu như vải vóc, ấm chén hoặc nông cụ.',
        visualStage: 'hth-farmer-market',
        visualDetails: {
          caption: 'Người nông dân bán Lúa -> Thu về Tiền -> Mua Vải',
          badges: ['Khởi đầu: Hàng hóa', 'Mục đích: Tiêu dùng'],
          dataPoints: [
            { label: 'Hàng xuất phát', value: '100kg Lúa', color: '#8A6328' },
            { label: 'Tiền trung gian', value: '1.000.000 đ', color: '#2D5A34' },
            { label: 'Hàng thu về', value: '10m Vải', color: '#682626' }
          ]
        },
        highlightKeywords: ['hàng hóa', 'giá trị sử dụng']
      },
      {
        id: 'hth-s2',
        sceneNumber: 2,
        title: 'Animation: Dòng chuyển hóa H – T – H',
        type: 'animation',
        startTime: 30,
        endTime: 75,
        narration: 'Hãy quan sát sơ đồ: Hàng hóa 1 được bán đi chuyển hóa thành Tiền (H - T). Sau đó, số Tiền này lập tức được dùng để mua Hàng hóa 2 (T - H). Tiền chỉ làm cầu nối tạm thời!',
        visualStage: 'hth-flow-animation',
        visualDetails: {
          caption: 'Chuyển động: Hàng 1 (bán) -> Tiền -> Hàng 2 (mua)',
          badges: ['Tiền là trung gian', 'Bảo toàn giá trị']
        },
        highlightKeywords: ['tiền tệ', 'lưu thông']
      },
      {
        id: 'hth-s3',
        sceneNumber: 3,
        title: 'Example: Bác thợ gốm và bác nông dân',
        type: 'example',
        startTime: 75,
        endTime: 110,
        narration: 'Bác thợ gốm bán 10 chiếc nồi đất giá 500.000 đồng, rồi cầm số tiền đó mua 50kg gạo. Hai cực đều có giá trị bằng 500.000 đồng, không có đồng nào tự sinh sôi thêm, nhưng cả hai bên đều đạt được giá trị sử dụng mong muốn.',
        visualStage: 'hth-concrete-example',
        visualDetails: {
          caption: '500k Gốm = 500k Tiền = 500k Gạo (Giá trị ngang giá)',
          badges: ['Không có thặng dư dôi ra', 'Giá trị ngang giá']
        },
        highlightKeywords: ['giá trị', 'giá trị sử dụng']
      },
      {
        id: 'hth-s4',
        sceneNumber: 4,
        title: 'Summary: Giới hạn của công thức H – T – H',
        type: 'summary',
        startTime: 110,
        endTime: 150,
        narration: 'Tóm lại, công thức H - T - H chỉ phản ánh hành vi tiêu dùng trao đổi. Nó dừng lại ngay khi nhu cầu được thỏa mãn và hoàn toàn không thể làm tiền tự biến thành tư bản!',
        visualStage: 'hth-summary',
        visualDetails: {
          caption: 'Mục đích: Giá trị sử dụng. Kết thúc khi hàng hóa được tiêu dùng.',
          badges: ['Giới hạn rõ ràng', 'Chưa phải là Tư bản']
        },
        highlightKeywords: ['tư bản', 'giá trị sử dụng']
      }
    ],
    transcript: [
      { id: 't1', time: 0, formattedTime: '00:00', text: 'Chào mừng bạn đến với video phân tích Công thức lưu thông hàng hóa H - T - H.' },
      { id: 't2', time: 18, formattedTime: '00:18', text: 'Trong xã hội tiền tư bản, người sản xuất nhỏ mang hàng hóa dư thừa ra thị trường để đổi lấy thứ mình cần.' },
      { id: 't3', time: 35, formattedTime: '00:35', text: 'Sơ đồ vận động là: Hàng hóa biến thành Tiền tệ, rồi Tiền tệ biến lại thành Hàng hóa.' },
      { id: 't4', time: 60, formattedTime: '01:00', text: 'Tiền ở đây chỉ là phương tiện trung gian thanh toán, không hề tăng lên về lượng giá trị.' },
      { id: 't5', time: 85, formattedTime: '01:25', text: 'Mục đích cao nhất của người bán hàng là giá trị sử dụng của món hàng thứ hai.' },
      { id: 't6', time: 115, formattedTime: '01:55', text: 'Khi hàng hóa thứ hai đã nằm trong tay người mua và đưa vào tiêu dùng, vòng quay chính thức kết thúc.' }
    ],
    quickQuiz: [
      {
        id: 'qq-hth-1',
        question: 'Mục đích cuối cùng của sự vận động trong công thức H – T – H là gì?',
        options: [
          'Thu được số tiền lớn hơn số tiền ban đầu',
          'Giá trị sử dụng nhằm thỏa mãn nhu cầu tiêu dùng cụ thể',
          'Tích lũy tư bản tài chính',
          'Bóc lột lao động thặng dư'
        ],
        correctIndex: 1,
        explanation: 'Trong công thức H – T – H, hành vi bắt đầu bằng hàng và kết thúc bằng hàng có giá trị sử dụng khác để tiêu dùng.',
        reviewTimestamp: 18,
        reviewLabel: 'Xem lại đoạn 00:18: Mục đích trao đổi hàng hóa giản đơn'
      },
      {
        id: 'qq-hth-2',
        question: 'Trong công thức H – T – H, tiền tệ đóng vai trò gì?',
        options: [
          'Là tư bản đầu tư sinh lời',
          'Là phương tiện trung gian phục vụ trao đổi',
          'Là nguồn gốc sinh ra giá trị thặng dư',
          'Là phương tiện bóc lột công nhân'
        ],
        correctIndex: 1,
        explanation: 'Tiền trong H – T – H chỉ là thước đo giá trị và phương tiện lưu thông trung gian, không làm tăng thêm giá trị.',
        reviewTimestamp: 60,
        reviewLabel: 'Xem lại đoạn 01:00: Vai trò của tiền trung gian'
      }
    ]
  },
  {
    id: 'video-tht',
    title: 'Công thức chung của tư bản T – H – T’',
    subtitle: 'Mục đích tăng thêm giá trị và sự chuyển hóa kỳ diệu: T’ = T + ΔT',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 180,
    formattedDuration: '03:00',
    badgeText: '🎬 Video kiến thức – Xem nhanh 3 phút',
    difficulty: 'Trọng tâm',
    thumbnailEmoji: '💵➔📦➔💰✨',
    keyTakeaways: [
      'Tư bản luôn bắt đầu bằng Tiền và kết thúc bằng một lượng Tiền lớn hơn (T – H – T′).',
      'Công thức chuẩn: T′ = T + ΔT (trong đó ΔT chính là giá trị thặng dư m).',
      'Mục đích của tư bản không phải giá trị sử dụng mà là Giá trị tăng thêm không ngừng.',
      'Sự vận động này là vô tận, không có giới hạn dừng lại như H – T – H.'
    ],
    keyTerms: [
      'tư bản',
      'công thức chung của tư bản',
      'giá trị thặng dư',
      'giá trị tăng thêm'
    ],
    formulaDiagram: {
      title: 'Công thức chung của Tư bản',
      code: 'T ──[Ứng trước]──> H ──[Bán ra]──> T′ (với T′ = T + ΔT)',
      explanation: 'Nếu T′ = T thì hành vi trở nên vô nghĩa vì không ai bỏ tiền ứng trước chỉ để thu về số tiền bằng đúng ban đầu. Do đó T′ bắt buộc phải lớn hơn T.',
      comparison: {
        leftTitle: 'Lưu thông giản đơn (H – T – H)',
        leftContent: 'Hàng ➔ Tiền ➔ Hàng. Mục đích: Giá trị sử dụng để tiêu dùng.',
        rightTitle: 'Lưu thông tư bản (T – H – T′)',
        rightContent: 'Tiền ➔ Hàng ➔ Tiền lớn hơn. Mục đích: Giá trị thặng dư (m).'
      }
    },
    scenes: [
      {
        id: 'tht-s1',
        sceneNumber: 1,
        title: 'Concept: Tiền tự nó có phải là tư bản?',
        type: 'concept',
        startTime: 0,
        endTime: 35,
        narration: 'Mọi tư bản đều bắt đầu bằng một số tiền. Nhưng nếu tiền chỉ nằm im trong két sắt hay ví của bạn, nó mãi mãi chỉ là tiền. Tiền chỉ hóa thành tư bản khi nó bước vào vòng quay sinh lời!',
        visualStage: 'tht-money-concept',
        visualDetails: {
          caption: 'Tiền cất giữ = Tiền tĩnh. Tiền đầu tư = Tư bản vận động!',
          badges: ['Khởi đầu: Tiền ứng trước', 'Kết thúc: Tiền lớn hơn']
        },
        highlightKeywords: ['tư bản', 'tiền tệ']
      },
      {
        id: 'tht-s2',
        sceneNumber: 2,
        title: 'Animation: Dòng tiền và hàng hóa T – H – T’',
        type: 'animation',
        startTime: 35,
        endTime: 90,
        narration: 'Nhà tư bản cầm số tiền 100 triệu đồng mua hàng hóa. Sau đó hàng hóa được chuyển hóa và bán ra thu về 120 triệu đồng! 20 triệu dôi ra đó chính là delta T hay giá trị thặng dư m!',
        visualStage: 'tht-flow-animation',
        visualDetails: {
          caption: '100 Triệu (T) ➔ Hàng Hóa (H) ➔ 120 Triệu (T′ = 100 + 20)',
          badges: ['T′ > T', 'ΔT = 20 Triệu (Giá trị thặng dư m)'],
          dataPoints: [
            { label: 'Tiền ứng ban đầu (T)', value: '100 Tr', color: '#8A6328' },
            { label: 'Hàng hóa trung gian (H)', value: 'Tư liệu + Sức LĐ', color: '#25462A' },
            { label: 'Tiền thu về (T′)', value: '120 Tr', color: '#682626' }
          ]
        },
        highlightKeywords: ['tư bản', 'giá trị thặng dư']
      },
      {
        id: 'tht-s3',
        sceneNumber: 3,
        title: 'Example: So sánh trực quan H–T–H và T–H–T’',
        type: 'example',
        startTime: 90,
        endTime: 135,
        narration: 'Trong H-T-H, bạn bắt đầu bằng bán thóc và kết thúc bằng việc ăn bánh mì. Nhưng trong T-H-T prime, nhà tư bản thu về 120 triệu không để cất đi, mà lại tiếp tục ném vào chu kỳ mới để thu về 150 triệu, 200 triệu!',
        visualStage: 'tht-comparison-diagram',
        visualDetails: {
          caption: 'H–T–H có điểm dừng. T–H–T′ là vận động tự lớn lên không có giới hạn!',
          badges: ['Vận động vô tận', 'Bản chất nhà tư bản']
        },
        highlightKeywords: ['giá trị thặng dư', 'tư bản']
      },
      {
        id: 'tht-s4',
        sceneNumber: 4,
        title: 'Summary: Tại sao gọi là công thức CHUNG của tư bản?',
        type: 'summary',
        startTime: 135,
        endTime: 180,
        narration: 'C. Mác gọi đây là công thức chung vì mọi loại tư bản: tư bản công nghiệp sản xuất, tư bản thương nghiệp buôn bán hay tư bản ngân hàng cho vay, đều vận động cốt lõi theo nguyên lý này.',
        visualStage: 'tht-summary',
        visualDetails: {
          caption: 'Áp dụng cho mọi hình thái tư bản trong nền kinh tế thị trường.',
          badges: ['Tư bản công nghiệp', 'Tư bản thương nghiệp', 'Tư bản cho vay']
        },
        highlightKeywords: ['tư bản', 'công thức chung của tư bản']
      }
    ],
    transcript: [
      { id: 't2-1', time: 0, formattedTime: '00:00', text: 'Chào mừng các bạn đến với video bài học: Công thức chung của tư bản T - H - T prime.' },
      { id: 't2-2', time: 20, formattedTime: '00:20', text: 'Mác đã chỉ ra rằng tiền chỉ biến thành tư bản khi nó vận động để tạo ra giá trị thặng dư.' },
      { id: 't2-3', time: 45, formattedTime: '00:45', text: 'Nhà tư bản ứng trước một số tiền T, mua hàng hóa H, và bán thu về T prime lớn hơn T.' },
      { id: 't2-4', time: 75, formattedTime: '01:15', text: 'Khoản chênh lệch dôi ra delta T được gọi là giá trị thặng dư, ký hiệu khoa học là m.' },
      { id: 't2-5', time: 105, formattedTime: '01:45', text: 'Khác với H-T-H có giới hạn tiêu dùng, sự vận động của tư bản là vô hạn, không ngừng tái sinh.' },
      { id: 't2-6', time: 145, formattedTime: '02:25', text: 'Bởi vậy T - H - T prime chính là công thức chung cho mọi loại hình tư bản tồn tại trên thị trường.' }
    ],
    quickQuiz: [
      {
        id: 'qq-tht-1',
        question: 'Công thức chung của tư bản có dạng biểu diễn là:',
        options: [
          'H – T – H',
          'T – H – T′ (với T′ = T + ΔT)',
          'T – T',
          'H – H'
        ],
        correctIndex: 1,
        explanation: 'Công thức chung của tư bản là T – H – T′ với T′ = T + ΔT (ΔT > 0 là giá trị thặng dư m).',
        reviewTimestamp: 45,
        reviewLabel: 'Xem lại đoạn 00:45: Cấu trúc công thức T – H – T′'
      },
      {
        id: 'qq-tht-2',
        question: 'Điểm khác biệt căn bản nhất về mục đích giữa T – H – T′ và H – T – H là gì?',
        options: [
          'H – T – H nhằm thu giá trị thặng dư, còn T – H – T′ nhằm thỏa mãn giá trị sử dụng',
          'T – H – T′ nhằm mục đích tăng thêm giá trị (m), còn H – T – H nhằm mục đích giá trị sử dụng',
          'Cả hai đều nhằm mục đích tiêu dùng hàng hóa',
          'Cả hai đều có giới hạn kết thúc khi hàng hóa được tiêu hủy'
        ],
        correctIndex: 1,
        explanation: 'H – T – H hướng tới giá trị sử dụng (tiêu dùng), trong khi T – H – T′ hướng tới giá trị tăng thêm (giá trị thặng dư).',
        reviewTimestamp: 105,
        reviewLabel: 'Xem lại đoạn 01:45: So sánh mục đích vận động'
      }
    ]
  },
  {
    id: 'video-surplus-concept',
    title: 'Giá trị thặng dư là gì?',
    subtitle: 'Định nghĩa khoa học, nguồn gốc lao động không công và ký hiệu m',
    sectionId: '3.1',
    sectionNumber: '3.1',
    durationSeconds: 165,
    formattedDuration: '02:45',
    badgeText: '🎬 Video kiến thức – Xem nhanh 2.7 phút',
    difficulty: 'Trọng tâm',
    thumbnailEmoji: '⚡💎⏱️📈',
    keyTakeaways: [
      'Giá trị thặng dư (m) là phần giá trị mới dôi ra ngoài giá trị sức lao động.',
      'Nó do công nhân làm thuê tạo ra trong thời gian lao động thặng dư.',
      'Bị nhà tư bản chiếm đoạt không bồi hoàn dựa trên quyền sở hữu tư liệu sản xuất.',
      'Là hòn đá tảng giải thích bản chất kinh tế của chủ nghĩa tư bản.'
    ],
    keyTerms: [
      'giá trị thặng dư',
      'sức lao động',
      'lao động thặng dư',
      'chiếm đoạt không bồi hoàn'
    ],
    formulaDiagram: {
      title: 'Cơ cấu giá trị hàng hóa',
      code: 'G = c + v + m (Giá trị mới tạo ra = v + m)',
      explanation: 'c là giá trị tư liệu sản xuất được chuyển vào; v là tiền công trả cho công nhân; m là giá trị thặng dư dôi ra rơi vào tay nhà tư bản.',
      comparison: {
        leftTitle: 'Thời gian tất yếu (t)',
        leftContent: 'Công nhân tạo ra lượng giá trị v bù đắp tiền lương của chính mình.',
        rightTitle: 'Thời gian thặng dư (t′)',
        rightContent: 'Công nhân tạo ra lượng giá trị m bị nhà tư bản chiếm đoạt.'
      }
    },
    scenes: [
      {
        id: 'sc-s1',
        sceneNumber: 1,
        title: 'Concept: Định nghĩa giá trị thặng dư',
        type: 'concept',
        startTime: 0,
        endTime: 40,
        narration: 'Giá trị thặng dư, ký hiệu là m, viết tắt từ Mehrwert trong tiếng Đức. Đây là phần giá trị mới dôi ra ngoài giá trị sức lao động do người lao động làm thuê sáng tạo ra.',
        visualStage: 'sc-definition',
        visualDetails: {
          caption: 'Mehrwert (m) = Giá trị mới dôi ra ngoài chi phí tiền lương',
          badges: ['Khái niệm cốt lõi', 'Hòn đá tảng lý luận']
        },
        highlightKeywords: ['giá trị thặng dư', 'sức lao động']
      },
      {
        id: 'sc-s2',
        sceneNumber: 2,
        title: 'Animation: Phân chia ngày lao động',
        type: 'animation',
        startTime: 40,
        endTime: 85,
        narration: 'Hãy nhìn vào ngày làm việc 8 tiếng. Trong 4 tiếng đầu, công nhân tạo ra giá trị vừa đủ trả tiền lương cho mình. Nhưng 4 tiếng sau, họ vẫn phải làm việc cật lực và tạo ra giá trị dôi ra m!',
        visualStage: 'sc-workday-split',
        visualDetails: {
          caption: 'Ngày 8 giờ = 4 giờ tất yếu (v) + 4 giờ thặng dư (m)',
          badges: ['t: Thời gian tất yếu', 't′: Thời gian thặng dư']
        },
        highlightKeywords: ['giá trị thặng dư', 'lao động thặng dư']
      },
      {
        id: 'sc-s3',
        sceneNumber: 3,
        title: 'Example: Chiếm đoạt không bồi hoàn',
        type: 'example',
        startTime: 85,
        endTime: 125,
        narration: 'Nhà tư bản không hề trả thêm đồng nào cho 4 giờ làm việc buổi chiều của công nhân, vì hợp đồng đã ký trả lương theo ngày. Đây chính là bản chất chiếm đoạt không bồi hoàn!',
        visualStage: 'sc-appropriation',
        visualDetails: {
          caption: 'Tiền lương trả cho cả ngày, nhưng giá trị tạo ra gấp đôi tiền lương!',
          badges: ['Chiếm đoạt hợp pháp theo luật tư sản', 'Bản chất bóc lột']
        },
        highlightKeywords: ['chiếm đoạt không bồi hoàn', 'tư bản']
      },
      {
        id: 'sc-s4',
        sceneNumber: 4,
        title: 'Summary: Hòn đá tảng kinh tế chính trị',
        type: 'summary',
        startTime: 125,
        endTime: 165,
        narration: 'Lênin khẳng định: Học thuyết giá trị thặng dư là hòn đá tảng của học thuyết kinh tế của Mác. Nó vén bức màn bí mật về nguồn gốc sự giàu có của giai cấp tư sản.',
        visualStage: 'sc-summary',
        visualDetails: {
          caption: 'V.I. Lênin: Hòn đá tảng của học thuyết kinh tế Mác.',
          badges: ['Khoa học', 'Cách mạng']
        },
        highlightKeywords: ['giá trị thặng dư', 'tư bản']
      }
    ],
    transcript: [
      { id: 't3-1', time: 0, formattedTime: '00:00', text: 'Giá trị thặng dư là gì và tại sao nó lại là phát kiến kinh tế vĩ đại nhất của Các Mác?' },
      { id: 't3-2', time: 25, formattedTime: '00:25', text: 'Về định nghĩa: Giá trị thặng dư m là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động.' },
      { id: 't3-3', time: 55, formattedTime: '00:55', text: 'Ngày làm việc luôn chia làm 2 phần: thời gian tất yếu t để hoàn lương và thời gian thặng dư t prime.' },
      { id: 't3-4', time: 90, formattedTime: '01:30', text: 'Toàn bộ của cải tạo ra trong thời gian thặng dư bị nhà tư bản chiếm đoạt không bồi hoàn.' },
      { id: 't3-5', time: 130, formattedTime: '02:10', text: 'Đây chính là bí mật nguồn gốc của lợi nhuận và sự tích lũy của cải trong chủ nghĩa tư bản.' }
    ],
    quickQuiz: [
      {
        id: 'qq-sc-1',
        question: 'Giá trị thặng dư (m) được tạo ra từ đâu?',
        options: [
          'Từ máy móc và công nghệ hiện đại trong nhà máy',
          'Từ việc mua rẻ bán đắt trong lưu thông hàng hóa',
          'Từ lao động sống không công của công nhân làm thuê trong thời gian thặng dư',
          'Do sự ưu đãi hào phóng của tự nhiên'
        ],
        correctIndex: 2,
        explanation: 'Chỉ có lao động sống của công nhân làm thuê trong thời gian lao động thặng dư mới tạo ra giá trị mới dôi ra m.',
        reviewTimestamp: 55,
        reviewLabel: 'Xem lại đoạn 00:55: Nguồn gốc tạo ra giá trị thặng dư'
      }
    ]
  },
  {
    id: 'video-contradiction',
    title: 'Mâu thuẫn của công thức chung của tư bản',
    subtitle: 'Nghịch lý: Tư bản không thể xuất hiện từ lưu thông, nhưng cũng không thể ngoài lưu thông',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 195,
    formattedDuration: '03:15',
    badgeText: '🎬 Video kiến thức – Xem nhanh 3.2 phút',
    difficulty: 'Nâng cao',
    thumbnailEmoji: '⚖️❓🔄🔑',
    keyTakeaways: [
      'Trao đổi ngang giá: Tổng giá trị hàng hóa không đổi, không thể sinh ra giá trị thặng dư.',
      'Trao đổi không ngang giá (bán đắt hoặc mua rẻ): Chỉ là sự phân phối lại túi tiền giữa người này và người khác.',
      'Ở ngoài lưu thông: Tiền hoặc hàng để im không tiếp xúc lao động thì không tự tăng giá trị.',
      'Kết luận biện chứng: Tư bản phải xuất hiện trong lưu thông và đồng thời không phải trong lưu thông!'
    ],
    keyTerms: [
      'mâu thuẫn công thức chung',
      'trao đổi ngang giá',
      'lưu thông',
      'sức lao động'
    ],
    formulaDiagram: {
      title: 'Mâu thuẫn biện chứng',
      code: '100$ (T) ──[Lưu thông]──> Hàng hóa ──[Lưu thông]──> 120$ (T′)',
      explanation: 'Câu hỏi hóc búa: 20$ tăng thêm xuất hiện từ đâu nếu mọi hành vi mua bán trên thị trường đều tuân theo quy luật ngang giá?',
      comparison: {
        leftTitle: 'Trong lưu thông',
        leftContent: 'Ngang giá: Tổng = không đổi. Không ngang giá: Kẻ được người mất, tổng XH không đổi.',
        rightTitle: 'Ngoài lưu thông',
        rightContent: 'Tiền cất két: Vẫn là tiền. Hàng cất kho: Hao mòn, không tự đẻ ra tiền.'
      }
    },
    scenes: [
      {
        id: 'cd-s1',
        sceneNumber: 1,
        title: 'Scene 1: Hiện công thức và nghịch lý',
        type: 'concept',
        startTime: 0,
        endTime: 35,
        narration: 'Nhà tư bản bỏ ra 100 đô la mua hàng hóa, rồi bán đi thu về 120 đô la. Một câu hỏi hóc búa đặt ra cho các nhà kinh tế: 20 đơn vị giá trị tăng thêm kia xuất hiện từ đâu?',
        visualStage: 'cd-paradox-intro',
        visualDetails: {
          caption: '100$ ➔ Hàng hóa ➔ 120$? 20$ xuất hiện từ đâu?',
          badges: ['Nghịch lý kinh tế', 'T′ = T + ΔT']
        },
        highlightKeywords: ['tư bản', 'giá trị thặng dư']
      },
      {
        id: 'cd-s2',
        sceneNumber: 2,
        title: 'Scene 2: Thử nghiệm trường hợp lưu thông',
        type: 'animation',
        startTime: 35,
        endTime: 85,
        narration: 'Giả sử trao đổi ngang giá: 100 đô đổi lấy hàng trị giá 100 đô, rồi bán lấy 100 đô. Rõ ràng m = 0! Còn nếu bán đắt 10%? Hôm nay bạn bán đắt cho người khác, ngày mai người khác lại bán đắt cho bạn. Tổng của cải xã hội không hề tăng lên!',
        visualStage: 'cd-circulation-test',
        visualDetails: {
          caption: 'Ngang giá: 100 = 100 (m=0). Không ngang giá: Móc túi lẫn nhau, tổng không đổi.',
          badges: ['Lưu thông không sinh ra giá trị mới']
        },
        highlightKeywords: ['trao đổi ngang giá', 'lưu thông']
      },
      {
        id: 'cd-s3',
        sceneNumber: 3,
        title: 'Scene 3: Xét trường hợp ngoài lưu thông',
        type: 'example',
        startTime: 85,
        endTime: 120,
        narration: 'Vậy nếu nằm ngoài lưu thông thì sao? Bạn cất 100 đô la vào két sắt 10 năm sau mở ra nó vẫn là 100 đô la. Hàng hóa để trong kho thậm chí còn bị mục nát hao hụt. Vậy ngoài lưu thông cũng không sinh ra giá trị!',
        visualStage: 'cd-outside-circulation',
        visualDetails: {
          caption: 'Cất tiền vào két: Tiền tĩnh không sinh sôi. Cất hàng vào kho: Hao mòn.',
          badges: ['Ngoài lưu thông không tạo ra m']
        },
        highlightKeywords: ['tư bản', 'lưu thông']
      },
      {
        id: 'cd-s4',
        sceneNumber: 4,
        title: 'Scene 4: Kết luận biện chứng của C. Mác',
        type: 'summary',
        startTime: 120,
        endTime: 160,
        narration: 'C. Mác kết luận: Tư bản không thể xuất hiện từ lưu thông, và cũng không thể xuất hiện ở bên ngoài lưu thông. Nó phải xuất hiện trong lưu thông và đồng thời không phải trong lưu thông!',
        visualStage: 'cd-marx-formulation',
        visualDetails: {
          caption: 'Mâu thuẫn: Vừa phải trong lưu thông, vừa phải không trong lưu thông!',
          badges: ['Mâu thuẫn biện chứng', 'Cần chìa khóa giải mã']
        },
        highlightKeywords: ['mâu thuẫn công thức chung', 'tư bản']
      },
      {
        id: 'cd-s5',
        sceneNumber: 5,
        title: 'Scene 5: Chìa khóa vàng giải quyết mâu thuẫn',
        type: 'quiz',
        startTime: 160,
        endTime: 195,
        narration: 'Để giải quyết mâu thuẫn này, nhà tư bản bắt buộc phải mua được trên thị trường lưu thông một thứ hàng hóa đặc biệt: HÀNG HÓA SỨC LAO ĐỘNG. Nhờ nó, mâu thuẫn hoàn toàn được giải quyết!',
        visualStage: 'cd-solution-key',
        visualDetails: {
          caption: 'Chìa khóa vàng: Hàng hóa Sức lao động!',
          badges: ['Mua trên thị trường (Trong lưu thông)', 'Tiêu dùng trong xưởng (Ngoài lưu thông)']
        },
        highlightKeywords: ['sức lao động', 'mâu thuẫn công thức chung']
      }
    ],
    transcript: [
      { id: 't4-1', time: 0, formattedTime: '00:00', text: 'Chào mừng các bạn đến với video phân tích Mâu thuẫn của công thức chung của tư bản.' },
      { id: 't4-2', time: 20, formattedTime: '00:20', text: 'Nếu T biến thành T prime lớn hơn, câu hỏi cốt lõi là giá trị tăng thêm ấy sinh ra từ đâu?' },
      { id: 't4-3', time: 50, formattedTime: '00:50', text: 'Lưu thông ngang giá không làm tăng giá trị; lưu thông không ngang giá chỉ là chuyển tiền từ túi người này sang túi người khác.' },
      { id: 't4-4', time: 95, formattedTime: '01:35', text: 'Ngoài lưu thông, tiền và hàng đứng yên không thể tự nhân đôi giá trị của chính nó.' },
      { id: 't4-5', time: 135, formattedTime: '02:15', text: 'Từ đó Mác rút ra kết luận biện chứng nổi tiếng về mâu thuẫn của công thức chung.' },
      { id: 't4-6', time: 170, formattedTime: '02:50', text: 'Và chìa khóa duy nhất giải quyết mâu thuẫn này chính là việc phát hiện ra Hàng hóa Sức lao động.' }
    ],
    quickQuiz: [
      {
        id: 'qq-cd-1',
        question: 'Vì sao việc mua rẻ bán đắt trong lưu thông không thể là nguồn gốc tạo ra giá trị thặng dư cho toàn xã hội?',
        options: [
          'Vì nhà nước tư sản cấm hành vi gian lận thương mại',
          'Vì tổng giá trị hàng hóa toàn xã hội không đổi, chỉ là sự phân phối lại giữa các chủ thể',
          'Vì người mua luôn luôn thông minh hơn người bán',
          'Vì tiền tệ bị hao mòn cơ học trong quá trình trao đổi'
        ],
        correctIndex: 1,
        explanation: 'Mua rẻ bán đắt chỉ là sự phân phối lại giá trị (lấy từ túi người này bỏ sang túi người khác), không hề sáng tạo thêm 1 đồng giá trị mới nào cho xã hội.',
        reviewTimestamp: 50,
        reviewLabel: 'Xem lại đoạn 00:50: Phân tích lưu thông không ngang giá'
      },
      {
        id: 'qq-cd-2',
        question: 'Mâu thuẫn của công thức chung của tư bản được C. Mác phát biểu như thế nào?',
        options: [
          'Tư bản xuất hiện hoàn toàn từ quá trình lưu thông mua bán trên thị trường tự do',
          'Tư bản không thể xuất hiện từ lưu thông, và cũng không thể xuất hiện ở bên ngoài lưu thông. Nó phải xuất hiện trong lưu thông và đồng thời không phải trong lưu thông',
          'Tư bản xuất hiện độc lập với mọi quá trình sản xuất và lưu thông',
          'Tư bản chỉ xuất hiện khi có sự bảo hộ của ngân hàng nhà nước'
        ],
        correctIndex: 1,
        explanation: 'Đây là luận điểm biện chứng mẫu mực của C. Mác về mâu thuẫn của công thức chung.',
        reviewTimestamp: 135,
        reviewLabel: 'Xem lại đoạn 02:15: Luận điểm biện chứng của C. Mác'
      }
    ]
  },
  {
    id: 'video-labor-power',
    title: 'Hàng hóa sức lao động là gì & 2 điều kiện',
    subtitle: 'Khái niệm năng lực lao động và hai điều kiện lịch sử để sức lao động biến thành hàng hóa',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 160,
    formattedDuration: '02:40',
    badgeText: '🎬 Video kiến thức – Xem nhanh 2.6 phút',
    difficulty: 'Cơ bản',
    thumbnailEmoji: '💪🧠⛓️🔓',
    keyTakeaways: [
      'Sức lao động là toàn bộ thể lực và trí lực tồn tại trong cơ thể người sống.',
      'Sức lao động không đương nhiên là hàng hóa trong mọi thời kỳ lịch sử.',
      'Điều kiện 1: Người lao động phải được tự do về thân thể (có quyền sở hữu sức lao động của mình).',
      'Điều kiện 2: Người lao động bị tước đoạt hết tư liệu sản xuất (buộc phải bán sức lao động để kiếm sống).'
    ],
    keyTerms: [
      'sức lao động',
      'hàng hóa sức lao động',
      'tự do thân thể',
      'tước đoạt tư liệu sản xuất'
    ],
    formulaDiagram: {
      title: 'Hai điều kiện lịch sử để Sức lao động là Hàng hóa',
      code: '[Tự do thân thể] + [Không có tư liệu sản xuất] ──> [Hàng hóa Sức lao động]',
      explanation: 'Người nô lệ không có điều kiện 1 (bản thân họ bị bán). Người thợ thủ công tự do có tư liệu sản xuất nên họ bán sản phẩm chứ không bán sức lao động.',
      comparison: {
        leftTitle: 'Điều kiện 1: Về pháp lý',
        leftContent: 'Người lao động được tự do về thân thể, làm chủ năng lực của mình.',
        rightTitle: 'Điều kiện 2: Về kinh tế',
        rightContent: 'Vô sản: Không có tư liệu sản xuất, không thể tự sản xuất để sống.'
      }
    },
    scenes: [
      {
        id: 'lp-s1',
        sceneNumber: 1,
        title: 'Concept: Sức lao động là gì?',
        type: 'concept',
        startTime: 0,
        endTime: 35,
        narration: 'Sức lao động hay năng lực lao động là toàn bộ thể lực và trí lực tồn tại trong con người đang sống, được đem ra vận dụng mỗi khi sản xuất ra một giá trị sử dụng nào đó.',
        visualStage: 'lp-definition',
        visualDetails: {
          caption: 'Sức lao động = Thể lực + Trí lực trong con người sống',
          badges: ['Khái niệm nền tảng', 'Khác với lao động']
        },
        highlightKeywords: ['sức lao động', 'giá trị sử dụng']
      },
      {
        id: 'lp-s2',
        sceneNumber: 2,
        title: 'Animation: Hai điều kiện lịch sử ra đời',
        type: 'animation',
        startTime: 35,
        endTime: 85,
        narration: 'Không phải lúc nào sức lao động cũng là hàng hóa. Trong thời kỳ chiếm hữu nô lệ hay phong kiến, người nô lệ bị bán cả con người. Sức lao động chỉ biến thành hàng hóa khi hội tụ đủ 2 điều kiện lịch sử!',
        visualStage: 'lp-two-conditions',
        visualDetails: {
          caption: 'Điều kiện 1: Tự do thân thể. Điều kiện 2: Không có tư liệu sản xuất.',
          badges: ['Tự do về pháp lý', 'Bị tước đoạt về kinh tế']
        },
        highlightKeywords: ['hàng hóa sức lao động', 'tự do thân thể']
      },
      {
        id: 'lp-s3',
        sceneNumber: 3,
        title: 'Example: Người nông dân mất đất thế kỷ 16-18',
        type: 'example',
        startTime: 85,
        endTime: 125,
        narration: 'Hiện tượng rào đất cướp ruộng Cừu ăn thịt người ở nước Anh thế kỷ 16 đã tước đoạt toàn bộ ruộng đất của nông dân, biến họ thành những người vô sản tự do nhưng không có gì ăn, buộc phải bước vào nhà máy bán sức lao động.',
        visualStage: 'lp-historical-enclosure',
        visualDetails: {
          caption: 'Phong trào rào đất cướp ruộng: Nông dân bị tước đoạt đất đai ➔ Công nhân làm thuê.',
          badges: ['Tích lũy nguyên thủy tư bản', 'Hình thành giai cấp công nhân']
        },
        highlightKeywords: ['tước đoạt tư liệu sản xuất', 'hàng hóa sức lao động']
      },
      {
        id: 'lp-s4',
        sceneNumber: 4,
        title: 'Summary: Bản chất lịch sử của phạm trù',
        type: 'summary',
        startTime: 125,
        endTime: 160,
        narration: 'Như vậy, hàng hóa sức lao động không phải là phạm trù vĩnh viễn, mà là một phạm trù lịch sử đặc thù của phương thức sản xuất tư bản chủ nghĩa.',
        visualStage: 'lp-summary',
        visualDetails: {
          caption: 'Hàng hóa sức lao động: Phạm trù lịch sử gắn liền với CNTB.',
          badges: ['Phạm trù lịch sử', 'Tiền đề ra đời của Tư bản']
        },
        highlightKeywords: ['hàng hóa sức lao động', 'tư bản']
      }
    ],
    transcript: [
      { id: 't5-1', time: 0, formattedTime: '00:00', text: 'Hàng hóa sức lao động là gì và vì sao Mác xem đây là phát hiện mấu chốt?' },
      { id: 't5-2', time: 25, formattedTime: '00:25', text: 'Sức lao động là toàn bộ thể lực và trí lực của một con người đang sống.' },
      { id: 't5-3', time: 48, formattedTime: '00:48', text: 'Để sức lao động biến thành hàng hóa, bắt buộc phải có hai điều kiện lịch sử cùng tồn tại.' },
      { id: 't5-4', time: 80, formattedTime: '01:20', text: 'Thứ nhất, người lao động phải tự do về mặt thân thể; thứ hai, họ phải bị tước đoạt mọi tư liệu sản xuất.' },
      { id: 't5-5', time: 130, formattedTime: '02:10', text: 'Nếu thiếu một trong hai điều kiện này, sức lao động sẽ không thể xuất hiện dưới dạng hàng hóa.' }
    ],
    quickQuiz: [
      {
        id: 'qq-lp-1',
        question: 'Hai điều kiện lịch sử để sức lao động trở thành hàng hóa là gì?',
        options: [
          'Người lao động có trình độ đại học và có vốn tích lũy',
          'Người lao động được tự do về thân thể và bị tước đoạt hết tư liệu sản xuất',
          'Người lao động sở hữu xưởng sản xuất và có quyền bầu cử',
          'Nhà tư bản trả lương cao và miễn thuế'
        ],
        correctIndex: 1,
        explanation: 'Hai điều kiện không thể thiếu: Tự do về thân thể (để có quyền bán) và Bị tước đoạt tư liệu sản xuất (buộc phải đi bán để kiếm sống).',
        reviewTimestamp: 80,
        reviewLabel: 'Xem lại đoạn 01:20: Hai điều kiện lịch sử'
      }
    ]
  },
  {
    id: 'video-two-attributes',
    title: 'Hai thuộc tính của hàng hóa sức lao động',
    subtitle: 'Giá trị (chi phí nuôi sống công nhân) và Giá trị sử dụng đặc biệt (khả năng tạo ra giá trị mới)',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 180,
    formattedDuration: '03:00',
    badgeText: '🎬 Video kiến thức – Xem nhanh 3 phút',
    difficulty: 'Trọng tâm',
    thumbnailEmoji: '⚖️🥖📈✨',
    keyTakeaways: [
      'Giá trị của hàng hóa sức lao động = Giá trị của các tư liệu sinh hoạt cần thiết để tái sản xuất ra nó.',
      'Gồm 3 bộ phận: Tư liệu nuôi công nhân + Chi phí nuôi gia đình con cái + Phí tổn đào tạo nghề nghiệp.',
      'Giá trị sức lao động mang yếu tố lịch sử và tinh thần (phụ thuộc vào trình độ văn minh của mỗi quốc gia).',
      'Giá trị sử dụng ĐẶC BIỆT: Khi tiêu dùng, nó sáng tạo ra giá trị mới lớn hơn giá trị của bản thân nó (v + m).'
    ],
    keyTerms: [
      'giá trị sức lao động',
      'giá trị sử dụng',
      'tái sản xuất sức lao động',
      'yếu tố lịch sử tinh thần'
    ],
    formulaDiagram: {
      title: 'Hai thuộc tính Hàng hóa Sức lao động',
      code: 'Thuộc tính 1: Giá trị = Tư liệu sinh hoạt (Cá nhân + Gia đình + Đào tạo)\nThuộc tính 2: Giá trị sử dụng = Sáng tạo Giá trị mới (v + m) với m > 0',
      explanation: 'Trong khi hàng hóa thông thường khi dùng thì hao mòn hoặc mất đi giá trị, thì sức lao động càng dùng lại càng sáng tạo ra giá trị mới lớn hơn!',
      comparison: {
        leftTitle: 'Hàng hóa thông thường',
        leftContent: 'Tiêu dùng làm mất đi giá trị sử dụng và chuyển dần giá trị cũ vào sản phẩm.',
        rightTitle: 'Hàng hóa sức lao động',
        rightContent: 'Tiêu dùng sáng tạo ra một lượng giá trị mới dôi ra: Giá trị mới = v + m!'
      }
    },
    scenes: [
      {
        id: 'ta-s1',
        sceneNumber: 1,
        title: 'Concept: Hai mặt của một món hàng đặc biệt',
        type: 'concept',
        startTime: 0,
        endTime: 35,
        narration: 'Cũng như mọi hàng hóa khác, hàng hóa sức lao động có 2 thuộc tính: Giá trị và Giá trị sử dụng. Nhưng ở đây, cả 2 thuộc tính đều mang những đặc điểm kỳ diệu không món hàng nào có được!',
        visualStage: 'ta-intro-concept',
        visualDetails: {
          caption: 'Hàng hóa sức lao động có Giá trị và Giá trị sử dụng mang tính chất đặc biệt.',
          badges: ['Thuộc tính 1: Giá trị', 'Thuộc tính 2: Giá trị sử dụng']
        },
        highlightKeywords: ['hàng hóa sức lao động', 'giá trị', 'giá trị sử dụng']
      },
      {
        id: 'ta-s2',
        sceneNumber: 2,
        title: 'Animation: 3 bộ phận cấu thành Giá trị',
        type: 'animation',
        startTime: 35,
        endTime: 85,
        narration: 'Giá trị sức lao động được đo bằng lượng lao động xã hội cần thiết để nuôi sống công nhân. Nó gồm 3 khoản: (1) Cơm ăn áo mặc nhà ở; (2) Chi phí nuôi con cái thế hệ sau; (3) Chi phí học nghề.',
        visualStage: 'ta-value-components',
        visualDetails: {
          caption: 'Giá trị SLĐ = Tư liệu sinh hoạt + Nuôi con cái + Chi phí đào tạo kỹ thuật',
          badges: ['Chi phí tái sản xuất', 'Yếu tố lịch sử - tinh thần'],
          dataPoints: [
            { label: 'Nuôi bản thân công nhân', value: '60%', color: '#8A6328' },
            { label: 'Nuôi gia đình con cái', value: '30%', color: '#2D5A34' },
            { label: 'Đào tạo nâng cao tay nghề', value: '10%', color: '#682626' }
          ]
        },
        highlightKeywords: ['giá trị sức lao động', 'tái sản xuất sức lao động']
      },
      {
        id: 'ta-s3',
        sceneNumber: 3,
        title: 'Example: Thuộc tính thứ 2 - Giá trị sử dụng phi thường',
        type: 'example',
        startTime: 85,
        endTime: 135,
        narration: 'Hãy so sánh: Khi bạn đốt 1 tấn than, than cháy hết và giá trị của nó biến mất. Nhưng khi nhà tư bản sử dụng sức lao động 8 tiếng, người công nhân không những bù đắp tiền lương 15 đô mà còn tạo ra thêm 15 đô thặng dư!',
        visualStage: 'ta-usevalue-magic',
        visualDetails: {
          caption: 'Than cháy hết = Mất giá trị. Sức lao động hoạt động = Sáng tạo thêm 15$ giá trị mới!',
          badges: ['Khả năng tự nhân đôi giá trị', 'Nguồn gốc của m']
        },
        highlightKeywords: ['giá trị sử dụng', 'giá trị thặng dư']
      },
      {
        id: 'ta-s4',
        sceneNumber: 4,
        title: 'Summary: Điểm cốt lõi cần nhớ',
        type: 'summary',
        startTime: 135,
        endTime: 180,
        narration: 'Giá trị sử dụng của hàng hóa sức lao động chính là nguồn gốc duy nhất sinh ra giá trị thặng dư. Đó là thứ hàng hóa biết đẻ ra vàng cho nhà tư bản!',
        visualStage: 'ta-summary',
        visualDetails: {
          caption: 'Sức lao động: Thứ hàng hóa duy nhất có thể tạo ra giá trị lớn hơn chính nó.',
          badges: ['Hòn đá tảng Mác - Lênin', 'Chìa khóa giải quyết mâu thuẫn']
        },
        highlightKeywords: ['hàng hóa sức lao động', 'giá trị thặng dư']
      }
    ],
    transcript: [
      { id: 't6-1', time: 0, formattedTime: '00:00', text: 'Chào mừng các bạn đến với video: Hai thuộc tính của hàng hóa sức lao động.' },
      { id: 't6-2', time: 20, formattedTime: '00:20', text: 'Thuộc tính thứ nhất: Giá trị của hàng hóa sức lao động được xác định như thế nào?' },
      { id: 't6-3', time: 45, formattedTime: '00:45', text: 'Nó được đo bằng giá trị của những tư liệu sinh hoạt nuôi sống công nhân, nuôi con cái họ và phí tổn đào tạo.' },
      { id: 't6-4', time: 80, formattedTime: '01:20', text: 'Điểm đặc biệt là nó bao hàm cả yếu tố lịch sử và tinh thần tùy thuộc vào trình độ phát triển của mỗi quốc gia.' },
      { id: 't6-5', time: 110, formattedTime: '01:50', text: 'Thuộc tính thứ hai: Giá trị sử dụng của sức lao động có khả năng kỳ diệu là tạo ra giá trị mới lớn hơn bản thân nó.' },
      { id: 't6-6', time: 150, formattedTime: '02:30', text: 'Chính thuộc tính giá trị sử dụng này là suối nguồn duy nhất làm nảy sinh giá trị thặng dư m.' }
    ],
    quickQuiz: [
      {
        id: 'qq-ta-1',
        question: 'Giá trị của hàng hóa sức lao động KHÁC với hàng hóa thông thường ở đặc điểm cốt lõi nào?',
        options: [
          'Không thể đo lường bằng thời gian lao động xã hội cần thiết',
          'Bao hàm cả yếu tố lịch sử và yếu tố tinh thần của từng dân tộc, thời đại',
          'Do người mua tự ý ấn định không theo quy luật thị trường',
          'Không bao gồm chi phí đào tạo nghề nghiệp'
        ],
        correctIndex: 1,
        explanation: 'Khác với vật vô tri vô giác, giá trị sức lao động gắn liền với con người sống, chịu ảnh hưởng của điều kiện lịch sử, văn hóa và trình độ văn minh của xã hội.',
        reviewTimestamp: 80,
        reviewLabel: 'Xem lại đoạn 01:20: Yếu tố lịch sử tinh thần của giá trị sức lao động'
      },
      {
        id: 'qq-ta-2',
        question: 'Đặc tính kỳ diệu của giá trị sử dụng của hàng hóa sức lao động khi tiêu dùng là gì?',
        options: [
          'Không bị tiêu hao trong quá trình làm việc',
          'Có khả năng tạo ra một lượng giá trị mới lớn hơn giá trị của chính bản thân nó',
          'Tự động tăng gấp ba lần sau mỗi năm làm việc',
          'Biến máy móc thành tư bản khả biến'
        ],
        correctIndex: 1,
        explanation: 'Khi được tiêu dùng (làm việc), sức lao động tạo ra giá trị mới = v + m, dôi ra một lượng thặng dư m cho nhà tư bản.',
        reviewTimestamp: 110,
        reviewLabel: 'Xem lại đoạn 01:50: Giá trị sử dụng tạo ra giá trị mới lớn hơn'
      }
    ]
  },
  {
    id: 'video-key-solution',
    title: 'Vì sao hàng hóa SLĐ là chìa khóa giải quyết mâu thuẫn?',
    subtitle: 'Lời giải cho nghịch lý: Vừa trong lưu thông (mua bán), vừa ngoài lưu thông (sản xuất)',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 165,
    formattedDuration: '02:45',
    badgeText: '🎬 Video kiến thức – Xem nhanh 2.7 phút',
    difficulty: 'Trọng tâm',
    thumbnailEmoji: '🔑🏭📈💡',
    keyTakeaways: [
      'Trong lưu thông: Nhà tư bản mua sức lao động theo đúng giá trị thị trường (ngang giá).',
      'Ngoài lưu thông: Nhà tư bản đưa công nhân vào xưởng sản xuất đóng kín cửa để tiêu dùng sức lao động.',
      'Quá trình sản xuất: Công nhân làm việc vượt quá thời gian tất yếu, tạo ra giá trị thặng dư m.',
      'Mâu thuẫn hoàn toàn được giải quyết: Giá trị tăng thêm sinh ra trong sản xuất, nhưng điều kiện mua bán diễn ra trong lưu thông!'
    ],
    keyTerms: [
      'chìa khóa giải quyết mâu thuẫn',
      'lưu thông và sản xuất',
      'tiêu dùng sức lao động',
      'giá trị mới'
    ],
    formulaDiagram: {
      title: 'Cơ chế giải quyết mâu thuẫn',
      code: 'TRONG LƯU THÔNG (Thị trường): Mua SLĐ đúng giá (ngang giá)\n        ↓\nNGOÀI LƯU THÔNG (Nhà xưởng): Tiêu dùng SLĐ ➔ Tạo ra Giá trị mới (v + m)\n        ↓\nKẾT QUẢ: Thu về T′ = T + m mà không hề vi phạm quy luật ngang giá!',
      explanation: 'Nhà tư bản không ăn gian trên thị trường lưu thông; họ thu được m vì đã mua được thứ hàng hóa có khả năng tự nở ra giá trị trong quá trình sản xuất.',
      comparison: {
        leftTitle: 'Trên thị trường (Lưu thông)',
        leftContent: 'Mua bán sức lao động và tư liệu sản xuất sòng phẳng, đúng giá trị.',
        rightTitle: 'Trong nhà xưởng (Sản xuất)',
        rightContent: 'Lao động của công nhân tạo ra giá trị mới lớn hơn chi phí tiền lương.'
      }
    },
    scenes: [
      {
        id: 'ks-s1',
        sceneNumber: 1,
        title: 'Scene 1: Nhắc lại câu đố mâu thuẫn',
        type: 'concept',
        startTime: 0,
        endTime: 30,
        narration: 'Làm thế nào mà nhà tư bản mua đúng giá trên thị trường nhưng lại bán ra thu về số tiền lớn hơn mà không vi phạm quy luật giá trị? Câu trả lời nằm ở cánh cửa nhà máy!',
        visualStage: 'ks-paradox-recap',
        visualDetails: {
          caption: 'Bí ẩn được giải mã sau cánh cửa nhà máy khép kín.',
          badges: ['Thị trường vs Nhà xưởng']
        },
        highlightKeywords: ['chìa khóa giải quyết mâu thuẫn', 'lưu thông']
      },
      {
        id: 'ks-s2',
        sceneNumber: 2,
        title: 'Scene 2: Giai đoạn 1 - Trên thị trường lưu thông',
        type: 'animation',
        startTime: 30,
        endTime: 75,
        narration: 'Trên thị trường, nhà tư bản gặp người công nhân. Nhà tư bản trả đúng 15 đô la tiền lương một ngày theo giá trị tư liệu sinh hoạt. Hai bên hoàn toàn bình đẳng và ngang giá!',
        visualStage: 'ks-market-phase',
        visualDetails: {
          caption: 'Giai đoạn lưu thông: Mua sức lao động đúng 15$ (Trao đổi ngang giá hoàn hảo)',
          badges: ['Trao đổi sòng phẳng', 'Không ăn gian']
        },
        highlightKeywords: ['hàng hóa sức lao động', 'trao đổi ngang giá']
      },
      {
        id: 'ks-s3',
        sceneNumber: 3,
        title: 'Scene 3: Giai đoạn 2 - Bên trong xưởng sản xuất',
        type: 'animation',
        startTime: 75,
        endTime: 125,
        narration: 'Nhưng khi bước vào xưởng sản xuất (ngoài lưu thông), nhà tư bản bắt đầu tiêu dùng sức lao động. Trong 4 giờ đầu, công nhân làm ra 15 đô bù lương. 4 giờ sau, họ làm ra thêm 15 đô thặng dư m!',
        visualStage: 'ks-factory-phase',
        visualDetails: {
          caption: 'Giai đoạn sản xuất: Tiêu dùng sức lao động tạo ra 30$ giá trị mới (15$ v + 15$ m)',
          badges: ['Ngoài lưu thông', 'Nơi sinh ra m']
        },
        highlightKeywords: ['sức lao động', 'giá trị thặng dư']
      },
      {
        id: 'ks-s4',
        sceneNumber: 4,
        title: 'Scene 4: Lời giải hoàn hảo cho Mâu thuẫn',
        type: 'summary',
        startTime: 125,
        endTime: 165,
        narration: 'Như vậy, tư bản hình thành trong lưu thông vì phải mua sức lao động trên thị trường; nhưng đồng thời không phải trong lưu thông vì giá trị thặng dư sinh ra từ chính quá trình sản xuất!',
        visualStage: 'ks-synthesis',
        visualDetails: {
          caption: 'Kết luận: Mua trong lưu thông, sản xuất ngoài lưu thông. Hoàn toàn thỏa mãn!',
          badges: ['Biện chứng Mác - Lênin', 'Giải quyết triệt để']
        },
        highlightKeywords: ['mâu thuẫn công thức chung', 'chìa khóa giải quyết mâu thuẫn']
      }
    ],
    transcript: [
      { id: 't7-1', time: 0, formattedTime: '00:00', text: 'Vì sao hàng hóa sức lao động lại là chìa khóa duy nhất giải quyết mâu thuẫn công thức chung?' },
      { id: 't7-2', time: 25, formattedTime: '00:25', text: 'Mác đã phân tách rạch ròi hai không gian: thị trường lưu thông và xưởng sản xuất.' },
      { id: 't7-3', time: 55, formattedTime: '00:55', text: 'Trên thị trường, việc mua bán sức lao động tuân thủ hoàn toàn quy luật giá trị ngang giá.' },
      { id: 't7-4', time: 90, formattedTime: '01:30', text: 'Nhưng trong xưởng sản xuất, việc tiêu dùng sức lao động đã sáng tạo ra giá trị mới vượt trội hơn giá trị của nó.' },
      { id: 't7-5', time: 130, formattedTime: '02:10', text: 'Nhờ đó, mâu thuẫn vừa trong lưu thông vừa ngoài lưu thông được giải quyết một cách biện chứng tuyệt vời.' }
    ],
    quickQuiz: [
      {
        id: 'qq-ks-1',
        question: 'Tại sao nói giá trị thặng dư được tạo ra "ngoài lưu thông"?',
        options: [
          'Vì nhà tư bản giấu tiền ở nước ngoài',
          'Vì giá trị thặng dư được tạo ra trong quá trình sản xuất (tiêu dùng sức lao động trong nhà xưởng)',
          'Vì nhà nước in tiền thưởng cho nhà tư bản',
          'Vì hàng hóa tự nở ra trong quá trình vận chuyển'
        ],
        correctIndex: 1,
        explanation: 'Lưu thông chỉ chuẩn bị các yếu tố đầu vào (mua tư liệu sản xuất và sức lao động); chính quá trình sản xuất trong nhà xưởng mới là nơi lao động sống tạo ra giá trị mới m.',
        reviewTimestamp: 90,
        reviewLabel: 'Xem lại đoạn 01:30: Quá trình sản xuất ngoài lưu thông'
      }
    ]
  },
  {
    id: 'video-production-process',
    title: 'Quá trình sản xuất giá trị thặng dư',
    subtitle: 'Mô hình kéo sợi bông kinh điển của C. Mác và phép tính 15$ thặng dư',
    sectionId: '3.1.1',
    sectionNumber: '3.1.1',
    durationSeconds: 210,
    formattedDuration: '03:30',
    badgeText: '🎬 Video kiến thức – Xem nhanh 3.5 phút',
    difficulty: 'Trọng tâm',
    thumbnailEmoji: '🧵⚙️⏱️💰',
    keyTakeaways: [
      'Sản xuất TBCN là sự thống nhất giữa tạo ra Giá trị sử dụng và tạo ra Giá trị thặng dư.',
      'Ví dụ kinh điển: Kéo sợi bông trong ngày làm việc 8 giờ của công nhân.',
      '4 giờ đầu (lao động tất yếu): Tạo ra 15$ giá trị mới bù đắp đúng tiền lương ứng trước.',
      '4 giờ sau (lao động thặng dư): Tạo thêm 15$ giá trị mới không phải trả tiền, đó chính là m!',
      'Tỷ suất giá trị thặng dư m′ trong ví dụ đạt đúng 100%.'
    ],
    keyTerms: [
      'sản xuất giá trị thặng dư',
      'thời gian lao động tất yếu',
      'thời gian lao động thặng dư',
      'tư bản bất biến c',
      'tư bản khả biến v'
    ],
    formulaDiagram: {
      title: 'Bảng tính ví dụ Kéo sợi bông 8 giờ',
      code: '4h đầu (t): 10kg bông (100$) + Hao mòn (6$) + Giá trị mới (15$) = 121$ (Hòa vốn lương)\n4h sau (t′): 10kg bông (100$) + Hao mòn (6$) + Giá trị mới (15$) = 121$\nTổng giá trị 20kg sợi = 272$ | Tổng chi phí ứng trước = 227$ | m = 15$!',
      explanation: 'Nhà tư bản đã ứng trước tiền lương 15$ cho cả ngày 8 giờ, nên 15$ tạo ra ở 4 giờ sau hoàn toàn thuộc về nhà tư bản.',
      comparison: {
        leftTitle: '4 giờ đầu (tất yếu)',
        leftContent: 'Tạo 15$ giá trị mới = Tiền công nhà tư bản trả (v).',
        rightTitle: '4 giờ sau (thặng dư)',
        rightContent: 'Tạo thêm 15$ giá trị mới không bồi hoàn = m (lợi nhuận).'
      }
    },
    scenes: [
      {
        id: 'pp-s1',
        sceneNumber: 1,
        title: 'Scene 1: Thiết lập giả định nhà máy kéo sợi',
        type: 'concept',
        startTime: 0,
        endTime: 40,
        narration: 'Hãy cùng bước vào xưởng kéo sợi bông của C. Mác thế kỷ 19: Để kéo 10kg sợi cần 10kg bông giá 100 đô, hao mòn máy 6 đô. Tiền thuê công nhân làm việc trọn ngày 8 tiếng là 15 đô.',
        visualStage: 'pp-setup-params',
        visualDetails: {
          caption: 'Giả định: 10kg bông = 100$, Hao mòn = 6$, Tiền lương cả ngày 8h = 15$.',
          badges: ['Chi phí tư bản', 'Ngày công 8 giờ']
        },
        highlightKeywords: ['tư bản bất biến c', 'tư bản khả biến v']
      },
      {
        id: 'pp-s2',
        sceneNumber: 2,
        title: 'Scene 2: Diễn biến 4 giờ làm việc đầu tiên',
        type: 'animation',
        startTime: 40,
        endTime: 95,
        narration: 'Trong 4 giờ đầu, công nhân kéo xong 10kg sợi. Giá trị 10kg sợi gồm: 100 đô bông + 6 đô máy + 15 đô giá trị mới công nhân tạo ra = 121 đô la. Số này đúng bằng 121 đô nhà tư bản bỏ ra. m lúc này bằng 0!',
        visualStage: 'pp-first-four-hours',
        visualDetails: {
          caption: '4h đầu: Giá trị sản phẩm = 121$ = Chi phí ứng trước 121$. m = 0!',
          badges: ['Thời gian tất yếu', 'Hòa vốn ban đầu']
        },
        highlightKeywords: ['thời gian lao động tất yếu', 'giá trị mới']
      },
      {
        id: 'pp-s3',
        sceneNumber: 3,
        title: 'Scene 3: Bất ngờ ở 4 giờ làm việc tiếp theo',
        type: 'animation',
        startTime: 95,
        endTime: 150,
        narration: 'Nhà tư bản không cho công nhân về vì đã mua trọn ngày 8 giờ! Công nhân phải làm tiếp 4 giờ nữa, kéo thêm 10kg bông. Họ lại tạo ra 15 đô giá trị mới, nhưng khoản này nhà tư bản KHÔNG PHẢI TRẢ TIỀN THÊM!',
        visualStage: 'pp-second-four-hours',
        visualDetails: {
          caption: '4h sau: Tạo thêm 15$ giá trị mới không phải trả lương ➔ Rơi vào túi nhà tư bản!',
          badges: ['Thời gian thặng dư', 'Sinh ra m = 15$']
        },
        highlightKeywords: ['thời gian lao động thặng dư', 'giá trị thặng dư']
      },
      {
        id: 'pp-s4',
        sceneNumber: 4,
        title: 'Scene 4: Bảng cân đối tài chính và tỷ suất m’',
        type: 'summary',
        startTime: 150,
        endTime: 210,
        narration: 'Kết quả: Bán sợi thu 242 đô, trừ chi phí nguyên vật liệu và lương, nhà tư bản bỏ túi trọn vẹn 15 đô la thặng dư. Tỷ suất bóc lột m prime = (15 / 15) nhân 100% = 100%!',
        visualStage: 'pp-balance-sheet',
        visualDetails: {
          caption: 'Tổng kết: m = 15$, m′ = (15 / 15) × 100% = 100%!',
          badges: ['Tỷ suất m′ = 100%', 'Bí quyết vạch trần']
        },
        highlightKeywords: ['tỷ suất giá trị thặng dư', 'sản xuất giá trị thặng dư']
      }
    ],
    transcript: [
      { id: 't8-1', time: 0, formattedTime: '00:00', text: 'Ví dụ kéo sợi bông kinh điển của Mác là bài học trực quan nhất về sản xuất giá trị thặng dư.' },
      { id: 't8-2', time: 30, formattedTime: '00:30', text: 'Các thông số: 10kg bông 100 đô, hao mòn máy móc 6 đô, tiền thuê sức lao động cả ngày 15 đô.' },
      { id: 't8-3', time: 65, formattedTime: '01:05', text: 'Sau 4 giờ lao động đầu tiên, công nhân tạo ra giá trị mới đúng bằng tiền lương của mình: 15 đô.' },
      { id: 't8-4', time: 110, formattedTime: '01:50', text: 'Bí quyết nằm ở 4 giờ sau: Công nhân tiếp tục làm việc và tạo thêm 15 đô thặng dư cho nhà tư bản.' },
      { id: 't8-5', time: 165, formattedTime: '02:45', text: 'Tổng kết ngày 8 giờ, nhà tư bản thu được 15 đô la giá trị thặng dư với tỷ suất bóc lột 100%.' }
    ],
    quickQuiz: [
      {
        id: 'qq-pp-1',
        question: 'Trong ví dụ kéo sợi bông của Mác, nếu nhà tư bản chỉ cho công nhân làm việc 4 giờ/ngày thì điều gì sẽ xảy ra?',
        options: [
          'Nhà tư bản sẽ phá sản ngay lập tức',
          'Giá trị sản phẩm đúng bằng chi phí ứng trước, nhà tư bản không thu được giá trị thặng dư (m = 0)',
          'Công nhân sẽ chiếm đoạt xưởng kéo sợi',
          'Giá trị thặng dư sẽ tăng lên gấp đôi'
        ],
        correctIndex: 1,
        explanation: 'Trong 4 giờ đầu, lượng giá trị mới công nhân tạo ra (15$) vừa đủ bù đắp tiền lương (15$), tiền chưa biến thành tư bản vì m = 0.',
        reviewTimestamp: 65,
        reviewLabel: 'Xem lại đoạn 01:05: Kết quả của 4 giờ đầu tiên'
      },
      {
        id: 'qq-pp-2',
        question: 'Tỷ suất giá trị thặng dư m′ trong ví dụ kéo sợi bông bằng bao nhiêu?',
        options: [
          '50%',
          '100%',
          '200%',
          '0%'
        ],
        correctIndex: 1,
        explanation: 'm′ = (m / v) × 100% = (15 / 15) × 100% = 100% (hoặc m′ = t′ / t = 4h / 4h = 100%).',
        reviewTimestamp: 165,
        reviewLabel: 'Xem lại đoạn 02:45: Cách tính tỷ suất m′'
      }
    ]
  },
  {
    id: 'video-nature-surplus',
    title: 'Bản chất của giá trị thặng dư & Tỷ suất m’',
    subtitle: 'Quan hệ bóc lột giai cấp, công thức tính m’, khối lượng M và sự biến tướng thành Lợi nhuận',
    sectionId: '3.1.2',
    sectionNumber: '3.1.2',
    durationSeconds: 175,
    formattedDuration: '02:55',
    badgeText: '🎬 Video kiến thức – Xem nhanh 2.9 phút',
    difficulty: 'Trọng tâm',
    thumbnailEmoji: '📊⚖️💰📈',
    keyTakeaways: [
      'Bản chất của giá trị thặng dư là quan hệ kinh tế - xã hội giữa giai cấp tư sản và giai cấp công nhân.',
      'Tỷ suất giá trị thặng dư m′ phản ánh chính xác trình độ bóc lột của tư bản đối với công nhân.',
      'Hai công thức tính m′: m′ = (m / v) × 100% hoặc m′ = (t′ / t) × 100%.',
      'Khối lượng giá trị thặng dư M = m′ × V (phản ánh quy mô bóc lột của tư bản).',
      'Trong thực tế, giá trị thặng dư bị biến tướng thành hình thái Lợi nhuận (p) che giấu nguồn gốc lao động.'
    ],
    keyTerms: [
      'tỷ suất giá trị thặng dư',
      'khối lượng giá trị thặng dư',
      'trình độ bóc lột',
      'lợi nhuận'
    ],
    formulaDiagram: {
      title: 'Công thức Tỷ suất và Khối lượng m',
      code: 'm′ = (m / v) × 100% = (t′ / t) × 100%\nM = m′ × V = (m / v) × V',
      explanation: 'm′ nói lên mức độ bóc lột (1 giờ làm cho mình thì làm cho chủ bao nhiêu giờ); M nói lên quy mô của cải bóc lột được từ toàn bộ đội ngũ công nhân.',
      comparison: {
        leftTitle: 'Tỷ suất m′ (Rate)',
        leftContent: 'Đo lường cường độ, trình độ bóc lột công nhân.',
        rightTitle: 'Khối lượng M (Mass)',
        rightContent: 'Đo lường tổng lượng của cải thặng dư thu được.'
      }
    },
    scenes: [
      {
        id: 'ns-s1',
        sceneNumber: 1,
        title: 'Concept: Bản chất giai cấp của giá trị thặng dư',
        type: 'concept',
        startTime: 0,
        endTime: 35,
        narration: 'Giá trị thặng dư không đơn thuần là một con số kinh tế, mà phản ánh bản chất quan hệ sản xuất tư bản chủ nghĩa: giai cấp tư sản chiếm đoạt lao động không công của giai cấp công nhân.',
        visualStage: 'ns-class-relation',
        visualDetails: {
          caption: 'Bản chất: Quan hệ kinh tế bóc lột lao động làm thuê.',
          badges: ['Giai cấp tư sản', 'Giai cấp vô sản']
        },
        highlightKeywords: ['bản chất của giá trị thặng dư', 'giá trị thặng dư']
      },
      {
        id: 'ns-s2',
        sceneNumber: 2,
        title: 'Animation: Hai công thức tính tỷ suất m’',
        type: 'animation',
        startTime: 35,
        endTime: 85,
        narration: 'Để đo trình độ bóc lột, Mác đưa ra tỷ suất m prime: lấy giá trị thặng dư m chia cho tư bản khả biến v; hoặc lấy thời gian thặng dư t prime chia cho thời gian tất yếu t. Nếu m prime = 200%, cứ 1 giờ làm cho mình công nhân phải làm 2 giờ cho chủ!',
        visualStage: 'ns-formula-rate',
        visualDetails: {
          caption: 'm′ = (m / v) × 100% = (t′ / t) × 100%',
          badges: ['Trình độ bóc lột', 'Hiệu suất khai thác SLĐ'],
          dataPoints: [
            { label: 'm′ = 100%', value: '1h tất yếu : 1h thặng dư', color: '#8A6328' },
            { label: 'm′ = 200%', value: '1h tất yếu : 2h thặng dư', color: '#682626' }
          ]
        },
        highlightKeywords: ['tỷ suất giá trị thặng dư', 'trình độ bóc lột']
      },
      {
        id: 'ns-s3',
        sceneNumber: 3,
        title: 'Example: Khối lượng M và sự biến tướng thành Lợi nhuận',
        type: 'example',
        startTime: 85,
        endTime: 135,
        narration: 'Một xí nghiệp có 1.000 công nhân, mỗi công nhân tạo ra 20 đô thặng dư một ngày thì tổng khối lượng M là 20.000 đô! Nhưng nhà tư bản gọi đó là Lợi nhuận của số vốn họ bỏ ra, che giấu hoàn toàn mồ hôi công nhân.',
        visualStage: 'ns-profit-mask',
        visualDetails: {
          caption: 'Khối lượng M = 1000 người × 20$ = 20.000$/ngày. Bị ngụy trang thành Lợi nhuận vốn!',
          badges: ['M = m′ × V', 'Lợi nhuận che đậy bản chất']
        },
        highlightKeywords: ['khối lượng giá trị thặng dư', 'lợi nhuận']
      },
      {
        id: 'ns-s4',
        sceneNumber: 4,
        title: 'Summary: Điểm then chốt',
        type: 'summary',
        startTime: 135,
        endTime: 175,
        narration: 'Phân tích bản chất giá trị thặng dư giúp ta không bị đánh lừa bởi những thuật ngữ tài chính hào nhoáng, nhận diện đúng chủ nhân thực sự của mọi của cải xã hội.',
        visualStage: 'ns-summary',
        visualDetails: {
          caption: 'Nhận thức khoa học: Lao động sống là cội nguồn của mọi giá trị thặng dư.',
          badges: ['Học thuyết C. Mác', 'Ý nghĩa thực tiễn']
        },
        highlightKeywords: ['giá trị thặng dư', 'tư bản']
      }
    ],
    transcript: [
      { id: 't9-1', time: 0, formattedTime: '00:00', text: 'Bản chất của giá trị thặng dư là gì và làm sao để đo lường trình độ bóc lột?' },
      { id: 't9-2', time: 25, formattedTime: '00:25', text: 'Mác vạch rõ: Đây là quan hệ kinh tế giữa giai cấp tư sản sở hữu tư liệu sản xuất và công nhân bán sức lao động.' },
      { id: 't9-3', time: 55, formattedTime: '00:55', text: 'Tỷ suất m prime phản ánh chính xác tỷ lệ phân chia ngày làm việc giữa công nhân và nhà tư bản.' },
      { id: 't9-4', time: 100, formattedTime: '01:40', text: 'Khối lượng M thể hiện quy mô tổng thể của cải bị chiếm đoạt khi nhân với toàn bộ tư bản khả biến V.' },
      { id: 't9-5', time: 140, formattedTime: '02:20', text: 'Hình thái lợi nhuận trên sổ sách kế toán đã cố tình che mờ nguồn gốc lao động sống của m.' }
    ],
    quickQuiz: [
      {
        id: 'qq-ns-1',
        question: 'Tỷ suất giá trị thặng dư (m′) phản ánh điều gì?',
        options: [
          'Hiệu quả sử dụng máy móc thiết bị của nhà máy',
          'Trình độ bóc lột của tư bản đối với người lao động làm thuê',
          'Tốc độ chu chuyển của dòng tiền tệ',
          'Mức thuế doanh nghiệp phải nộp cho nhà nước'
        ],
        correctIndex: 1,
        explanation: 'm′ đo lường tỷ lệ thời gian lao động thặng dư so với thời gian lao động tất yếu, tức phản ánh trực tiếp trình độ bóc lột công nhân.',
        reviewTimestamp: 55,
        reviewLabel: 'Xem lại đoạn 00:55: Ý nghĩa của tỷ suất m′'
      }
    ]
  },
  {
    id: 'video-industry-40',
    title: 'Người lao động trong Cách mạng công nghiệp 4.0',
    subtitle: 'AI, Robot tự hành có tạo ra giá trị mới không? Và các hình thái bóc lột thuật toán mới',
    sectionId: '3.2',
    sectionNumber: '3.2',
    durationSeconds: 200,
    formattedDuration: '03:20',
    badgeText: '🎬 Video kiến thức – Xem nhanh 3.3 phút',
    difficulty: 'Nâng cao',
    thumbnailEmoji: '🤖📱🧠⚖️',
    keyTakeaways: [
      'Robot và AI thuộc về Tư bản bất biến (c): Chúng chỉ chuyển dịch giá trị có sẵn, KHÔNG tự tạo ra giá trị mới.',
      'Nguồn gốc của giá trị trong thời đại số vẫn là lao động sống phức tạp của lập trình viên, kỹ sư và công nhân vận hành.',
      'Hình thái bóc lột mới: Quản lý bằng thuật toán (Algorithmic Management), kinh tế nền tảng (Gig Economy).',
      'Lao động vô hình 24/7 (Invisible Labor): Làm việc từ xa xóa mờ ranh giới thời gian nghỉ ngơi, kéo dài ngày lao động tuyệt đối.',
      'Việt Nam thừa nhận giá trị thặng dư khách quan để phát triển kinh tế, đồng thời bảo vệ công nhân thông qua luật pháp và công đoàn.'
    ],
    keyTerms: [
      'cách mạng công nghiệp 4.0',
      'tư bản bất biến c',
      'quản lý thuật toán',
      'lao động số'
    ],
    formulaDiagram: {
      title: 'Bản chất của AI & Robot theo C. Mác',
      code: 'Robot & AI = Tư bản bất biến (c) ──[Hao mòn dần]──> Chuyển dịch giá trị cũ\nLao động trí tuệ kỹ sư = Tư bản khả biến (v) ──> Sáng tạo Giá trị mới (v + m)',
      explanation: 'Dù nhà máy tự động hóa hoàn toàn không có công nhân trực tiếp, giá trị sản phẩm vẫn bắt nguồn từ lao động trí tuệ của đội ngũ kỹ sư sáng tạo ra hệ thống đó.',
      comparison: {
        leftTitle: 'Quan điểm tư sản hiện đại',
        leftContent: 'Robot và máy móc tự động hóa thay thế người và tự tạo ra lợi nhuận.',
        rightTitle: 'Quan điểm khoa học của C. Mác',
        rightContent: 'Robot chỉ là tư bản bất biến (c). Chỉ có lao động sống của con người mới tạo ra giá trị mới!'
      }
    },
    scenes: [
      {
        id: 'i4-s1',
        sceneNumber: 1,
        title: 'Scene 1: Nhà máy "đèn tắt" và câu hỏi thời đại',
        type: 'concept',
        startTime: 0,
        endTime: 35,
        narration: 'Trong các nhà máy đèn tắt không có bóng dáng công nhân nào, chỉ toàn robot làm việc ngày đêm. Nhiều người tự hỏi: Có phải học thuyết của Mác đã lỗi thời, robot nay đã tạo ra giá trị mới?',
        visualStage: 'i4-lights-out-factory',
        visualDetails: {
          caption: 'Nhà máy tự động hóa hoàn toàn: Liệu robot có tạo ra giá trị thặng dư?',
          badges: ['Tranh luận thời đại 4.0', 'Thách thức lý luận']
        },
        highlightKeywords: ['cách mạng công nghiệp 4.0', 'tư bản bất biến c']
      },
      {
        id: 'i4-s2',
        sceneNumber: 2,
        title: 'Scene 2: Bản chất của AI theo Mác - Tư bản bất biến (c)',
        type: 'animation',
        startTime: 35,
        endTime: 90,
        narration: 'Câu trả lời dứt khoát của Mác là: KHÔNG! Robot và AI dù thông minh đến đâu cũng chỉ là Tư bản bất biến (c). Nó hao mòn và chuyển dịch từng phần giá trị cũ vào sản phẩm, chứ không thể tự sinh ra giá trị mới dôi ra!',
        visualStage: 'i4-ai-constant-capital',
        visualDetails: {
          caption: 'Robot = Tư bản bất biến (c). Chỉ chuyển dịch giá trị có sẵn từ quá khứ!',
          badges: ['Không tự tạo ra m', 'Chỉ là công cụ lao động']
        },
        highlightKeywords: ['tư bản bất biến c', 'giá trị mới']
      },
      {
        id: 'i4-s3',
        sceneNumber: 3,
        title: 'Scene 3: Nguồn gốc thực sự - Lao động trí tuệ phức tạp',
        type: 'example',
        startTime: 90,
        endTime: 140,
        narration: 'Nguồn gốc giá trị thực sự nằm ở lao động sống của các kỹ sư phần mềm, chuyên gia huấn luyện AI và đội ngũ bảo trì hệ thống. 1 giờ lao động trí tuệ phức tạp của họ bằng nhiều giờ lao động giản đơn gộp lại!',
        visualStage: 'i4-intellectual-labor',
        visualDetails: {
          caption: 'Lao động sống trí tuệ: Các kỹ sư, lập trình viên tạo ra giá trị khổng lồ.',
          badges: ['Lao động phức tạp', 'Cội nguồn giá trị thặng dư 4.0']
        },
        highlightKeywords: ['lao động số', 'sức lao động']
      },
      {
        id: 'i4-s4',
        sceneNumber: 4,
        title: 'Scene 4: Bóc lột thuật toán và thực tiễn Việt Nam',
        type: 'summary',
        startTime: 140,
        endTime: 200,
        narration: 'Kinh tế 4.0 còn đẻ ra quản lý bằng thuật toán, tài xế công nghệ gig economy và làm việc từ xa 24/7. Việt Nam tận dụng đầu tư công nghệ nhưng kiên quyết bảo vệ an sinh và quyền lợi người lao động!',
        visualStage: 'i4-algorithmic-management',
        visualDetails: {
          caption: 'Bóc lột vô hình bằng thuật toán ➔ Nhà nước & Công đoàn bảo vệ an sinh người lao động.',
          badges: ['Kinh tế thị trường định hướng XHCN', 'Bảo vệ quyền công nhân']
        },
        highlightKeywords: ['quản lý thuật toán', 'kinh tế thị trường định hướng XHCN']
      }
    ],
    transcript: [
      { id: 't10-1', time: 0, formattedTime: '00:00', text: 'Chào mừng các bạn đến với bài học đặc biệt: Người lao động trong Cách mạng công nghiệp 4.0.' },
      { id: 't10-2', time: 25, formattedTime: '00:25', text: 'Khi AI và Robot thay thế hàng triệu việc làm, liệu học thuyết giá trị thặng dư còn giữ nguyên giá trị?' },
      { id: 't10-3', time: 55, formattedTime: '00:55', text: 'C. Mác khẳng định máy móc tự động chỉ là tư bản bất biến c, chỉ chuyển dịch giá trị chứ không thể tạo ra giá trị mới.' },
      { id: 't10-4', time: 105, formattedTime: '01:45', text: 'Cội nguồn giá trị trong thời đại số dịch chuyển sang lao động trí tuệ phức tạp của kỹ sư và nhà nghiên cứu.' },
      { id: 't10-5', time: 155, formattedTime: '02:35', text: 'Sự xuất hiện của quản lý thuật toán và kinh tế nền tảng đòi hỏi chính sách bảo vệ người lao động mạnh mẽ hơn bao giờ hết.' }
    ],
    quickQuiz: [
      {
        id: 'qq-i4-1',
        question: 'Theo học thuyết kinh tế của C. Mác, Trí tuệ nhân tạo (AI) và Robot tự hành thuộc về bộ phận tư bản nào?',
        options: [
          'Tư bản khả biến (v)',
          'Tư bản bất biến (c)',
          'Tư bản tiền tệ',
          'Giá trị thặng dư siêu ngạch'
        ],
        correctIndex: 1,
        explanation: 'Robot và AI là tư liệu sản xuất tinh vi kết tinh từ lao động quá khứ, thuộc tư bản bất biến (c). Chúng chỉ chuyển dịch giá trị cũ hao mòn vào sản phẩm, không tạo ra giá trị mới.',
        reviewTimestamp: 55,
        reviewLabel: 'Xem lại đoạn 00:55: Bản chất của AI theo Mác'
      },
      {
        id: 'qq-i4-2',
        question: 'Tại sao việc "làm việc từ xa (Work From Home) và nhận tin nhắn công việc ban đêm" lại được coi là hình thái bóc lột mới?',
        options: [
          'Vì người lao động tốn tiền điện của gia đình',
          'Vì nó kéo dài ngày lao động tuyệt đối một cách vô hình, xóa nhòa ranh giới giữa giờ làm việc và giờ nghỉ ngơi',
          'Vì phần mềm máy tính làm việc chậm hơn ở công ty',
          'Vì nhà tư bản không cung cấp trà nước miễn phí'
        ],
        correctIndex: 1,
        explanation: 'Làm việc từ xa 24/7 kéo dài thời gian làm việc vô hình ngoài giờ hành chính mà không được trả thêm lương, thực chất là kéo dài ngày lao động tuyệt đối.',
        reviewTimestamp: 155,
        reviewLabel: 'Xem lại đoạn 02:35: Các biến tướng bóc lột số'
      }
    ]
  }
];

export function getVideosBySectionId(sectionId: string): KnowledgeVideo[] {
  return KNOWLEDGE_VIDEOS.filter(v => v.sectionId === sectionId);
}

export function getVideoById(id: string): KnowledgeVideo | undefined {
  return KNOWLEDGE_VIDEOS.find(v => v.id === id);
}
