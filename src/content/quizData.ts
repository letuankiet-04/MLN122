import { QuizQuestion } from '../types/textbook';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-mc-1',
    type: 'multiple-choice',
    topic: 'Công thức chung của tư bản',
    difficulty: 'Cơ bản',
    sectionId: '3.1.1',
    question: 'Điểm khác biệt cơ bản nhất về mục đích giữa lưu thông hàng hóa giản đơn (H – T – H) và lưu thông tư bản (T – H – T′) là gì?',
    options: [
      'H–T–H nhằm thu được tiền mặt, còn T–H–T′ nhằm thu được hàng hóa quý hiếm.',
      'H–T–H nhằm mục đích giá trị sử dụng (tiêu dùng), còn T–H–T′ nhằm mục đích giá trị và sự gia tăng giá trị (giá trị thặng dư).',
      'H–T–H không có giới hạn, còn T–H–T′ kết thúc ngay sau một chu kỳ.',
      'H–T–H bắt đầu bằng tiền, còn T–H–T′ bắt đầu bằng hàng hóa.'
    ],
    correctAnswer: 1,
    explanation: 'Trong lưu thông hàng hóa giản đơn (H-T-H), mục đích là bán hàng lấy tiền rồi mua hàng khác có giá trị sử dụng mình cần. Trong lưu thông tư bản (T-H-T\'), mục đích là tiền tệ và sự lớn lên không ngừng của giá trị (T\' = T + m).'
  },
  {
    id: 'q-mc-2',
    type: 'multiple-choice',
    topic: 'Mâu thuẫn công thức chung',
    difficulty: 'Trung bình',
    sectionId: '3.1.1',
    question: 'Theo C. Mác, tại sao trao đổi không ngang giá (bán đắt hơn giá trị hoặc mua rẻ hơn giá trị) lại không thể giải thích được nguồn gốc của giá trị thặng dư trên phạm vi toàn xã hội?',
    options: [
      'Vì pháp luật cấm bán đắt mua rẻ trên thị trường.',
      'Vì tiền tệ luôn giữ giá trị tuyệt đối không thay đổi.',
      'Vì cái được của người này chính là cái mất của người khác, tổng số giá trị của toàn xã hội không hề tăng lên một xu nào.',
      'Vì người tiêu dùng sẽ tẩy chay các nhà tư bản bán đắt.'
    ],
    correctAnswer: 2,
    explanation: 'Trao đổi không ngang giá chỉ phân phối lại giá trị có sẵn giữa các chủ thể trên thị trường, chứ không tạo ra thêm bất kỳ giá trị mới nào cho xã hội.'
  },
  {
    id: 'q-mc-3',
    type: 'multiple-choice',
    topic: 'Hàng hóa sức lao động',
    difficulty: 'Cơ bản',
    sectionId: '3.1.1',
    question: 'Giá trị sử dụng đặc biệt của hàng hóa sức lao động khác với các hàng hóa thông thường ở điểm nào?',
    options: [
      'Nó bị hao mòn hoàn toàn sau một lần sử dụng duy nhất.',
      'Nó có thể cất giữ trong kho vô thời hạn mà không giảm giá trị.',
      'Khi tiêu dùng, nó sáng tạo ra một lượng giá trị mới lớn hơn giá trị của bản thân nó (Giá trị mới = v + m).',
      'Nó có thể trao đổi mà không cần có tiền tệ trung gian.'
    ],
    correctAnswer: 2,
    explanation: 'Đây là đặc tính kỳ diệu của sức lao động: khi người công nhân làm việc, họ vừa bảo tồn giá trị cũ vừa tạo ra lượng giá trị mới lớn hơn giá trị sức lao động mà nhà tư bản đã mua.'
  },
  {
    id: 'q-calc-1',
    type: 'calculation',
    topic: 'Ví dụ kéo sợi bông & Sản xuất giá trị thặng dư',
    difficulty: 'Trung bình',
    sectionId: '3.1.1',
    question: 'Một nhà tư bản ứng ra 100 USD mua bông, 6 USD hao mòn máy móc, và 15 USD thuê công nhân trong ngày 8 giờ. Trong cả ngày, công nhân sáng tạo ra lượng giá trị mới là 30 USD. Tính giá trị của sản phẩm làm ra và lượng giá trị thặng dư (m)?',
    options: [
      'Giá trị sản phẩm = 121 USD; Giá trị thặng dư = 0 USD',
      'Giá trị sản phẩm = 136 USD; Giá trị thặng dư = 15 USD',
      'Giá trị sản phẩm = 151 USD; Giá trị thặng dư = 30 USD',
      'Giá trị sản phẩm = 136 USD; Giá trị thặng dư = 30 USD'
    ],
    correctAnswer: 1,
    calculationSteps: [
      'Tư bản bất biến (c) = Tiền bông (100) + Hao mòn máy (6) = 106 USD.',
      'Tư bản khả biến (v) = Tiền thuê sức lao động = 15 USD.',
      'Tư bản ứng trước (C) = c + v = 106 + 15 = 121 USD.',
      'Giá trị mới do công nhân tạo ra = 30 USD (gồm v = 15 USD và m = 15 USD).',
      'Giá trị sản phẩm (G) = c + (Giá trị mới) = 106 + 30 = 136 USD.',
      'Giá trị thặng dư (m) = G - C = 136 - 121 = 15 USD.'
    ],
    explanation: 'Giá trị sản phẩm là 136 USD. Nhà tư bản bỏ ra 121 USD, thu về 136 USD, dôi ra 15 USD giá trị thặng dư (m). Tỷ suất m\' = (15 / 15) × 100% = 100%.'
  },
  {
    id: 'q-tf-1',
    type: 'true-false',
    topic: 'Tư bản bất biến và Tư bản khả biến',
    difficulty: 'Cơ bản',
    sectionId: '3.1.1',
    question: 'Tư bản bất biến (c) bao gồm máy móc, nhà xưởng, nguyên nhiên vật liệu có thể tự nó sinh ra giá trị thặng dư nếu được áp dụng công nghệ tự động hóa tối tân.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 1, // Sai
    explanation: 'Sai. Tư bản bất biến (c) chỉ chuyển dịch giá trị có sẵn của nó vào sản phẩm mới thông qua lao động cụ thể của công nhân, nó không thể tự tăng thêm giá trị. Nguồn gốc duy nhất của m là tư bản khả biến (v) — tức lao động sống của con người.'
  },
  {
    id: 'q-mc-4',
    type: 'multiple-choice',
    topic: 'Tỷ suất và khối lượng giá trị thặng dư',
    difficulty: 'Trung bình',
    sectionId: '3.1.2',
    question: 'Một xí nghiệp có ngày làm việc 8 giờ, trong đó thời gian lao động tất yếu là 3 giờ, thời gian lao động thặng dư là 5 giờ. Tỷ suất giá trị thặng dư (m′) là bao nhiêu và nó phản ánh điều gì?',
    options: [
      'm′ = 60%, phản ánh hiệu quả sử dụng máy móc.',
      'm′ = 166.7%, phản ánh trình độ bóc lột của nhà tư bản đối với công nhân.',
      'm′ = 62.5%, phản ánh tỷ lệ chia lợi nhuận giữa nhà tư bản và công nhân.',
      'm′ = 266.7%, phản ánh quy mô sản xuất của xí nghiệp.'
    ],
    correctAnswer: 1,
    explanation: 'Công thức: m′ = (t′ / t) × 100% = (5 / 3) × 100% = 166.67%. Tỷ suất giá trị thặng dư m′ nói lên TRÌNH ĐỘ BÓC LỘT của nhà tư bản đối với công nhân làm thuê.'
  },
  {
    id: 'q-mc-5',
    type: 'multiple-choice',
    topic: 'Phân biệt Giá trị thặng dư và Lợi nhuận',
    difficulty: 'Trung bình',
    sectionId: '3.1.2',
    question: 'Nhận định nào sau đây là ĐÚNG khi so sánh Giá trị thặng dư (m) và Lợi nhuận (p)?',
    options: [
      'Lợi nhuận lớn hơn giá trị thặng dư trên phạm vi toàn xã hội.',
      'Giá trị thặng dư chỉ sinh ra từ lưu thông hàng hóa, còn lợi nhuận sinh ra từ sản xuất.',
      'Lợi nhuận là hình thái biểu hiện bề ngoài của giá trị thặng dư, được ngộ nhận do toàn bộ tư bản ứng trước (k = c + v) sinh ra, che đậy bản chất bóc lột.',
      'Giá trị thặng dư do nhà tư bản tạo ra, còn lợi nhuận do công nhân tạo ra.'
    ],
    correctAnswer: 2,
    explanation: 'Bản chất: m là thực chất (do lao động sống v sinh ra), còn p là hình thái biểu hiện trên thị trường, làm người ta tưởng rằng toàn bộ tư bản k = c + v đẻ ra lợi nhuận, che giấu sự bóc lột.'
  },
  {
    id: 'q-calc-2',
    type: 'calculation',
    topic: 'Phương pháp sản xuất giá trị thặng dư',
    difficulty: 'Nâng cao',
    sectionId: '3.1.3',
    question: 'Ngày lao động ban đầu là 8 giờ (t = 4h, t′ = 4h, m′ = 100%). Nếu nhờ tăng năng suất lao động xã hội, thời gian lao động tất yếu giảm từ 4 giờ xuống còn 2 giờ (ngày làm việc vẫn 8 giờ), tỷ suất giá trị thặng dư tương đối mới là bao nhiêu?',
    options: [
      'm′ = 150%',
      'm′ = 200%',
      'm′ = 300%',
      'm′ = 400%'
    ],
    correctAnswer: 2,
    calculationSteps: [
      'Thời gian lao động tất yếu mới (t) = 2 giờ.',
      'Thời gian lao động thặng dư mới (t′) = Độ dài ngày lao động (8h) - t (2h) = 6 giờ.',
      'Tỷ suất giá trị thặng dư mới: m′ = (t′ / t) × 100% = (6 / 2) × 100% = 300%.'
    ],
    explanation: 'Nhờ tăng năng suất lao động xã hội, t giảm còn 2h, t′ tăng lên 6h, làm cho m′ tăng vọt từ 100% lên 300% mà không cần kéo dài ngày lao động.'
  },
  {
    id: 'q-mc-6',
    type: 'multiple-choice',
    topic: 'Cách mạng công nghiệp 4.0',
    difficulty: 'Nâng cao',
    sectionId: '3.2',
    question: 'Trong bối cảnh CMCN 4.0, khi một dây chuyền được tự động hóa hoàn toàn bằng robot và AI, tại sao theo lý luận của C. Mác, robot không trực tiếp tạo ra giá trị mới?',
    options: [
      'Vì robot không có quyền công dân và không có hợp đồng lao động.',
      'Vì robot thuộc về tư bản bất biến (c), giá trị của nó chỉ được bảo tồn và chuyển dịch dần vào sản phẩm, chỉ có lao động sống của con người mới là nguồn gốc của giá trị mới.',
      'Vì robot tiêu tốn quá nhiều năng lượng điện làm tăng chi phí sản xuất.',
      'Vì robot không biết đàm phán tiền lương với chủ xưởng.'
    ],
    correctAnswer: 1,
    explanation: 'Robot là tư liệu sản xuất tinh xảo, thuộc tư bản bất biến (c). Giá trị của nó kết tinh từ lao động quá khứ và chuyển dịch dần vào sản phẩm mới. Nguồn gốc duy nhất tạo ra giá trị mới và thặng dư vẫn là lao động sống của con người (kỹ sư lập trình, chuyên gia thuật toán, vận hành).'
  },
  {
    id: 'q-tf-2',
    type: 'true-false',
    topic: 'Thực tiễn Việt Nam',
    difficulty: 'Cơ bản',
    sectionId: '3.2',
    question: 'Trong nền kinh tế thị trường định hướng XHCN ở Việt Nam, việc chấp nhận quan hệ bóc lột lao động làm thuê và sự sản xuất giá trị thặng dư ở khu vực kinh tế tư nhân và FDI là một bước lùi của chủ nghĩa xã hội.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 1, // Sai
    explanation: 'Sai. Đây là một tất yếu khách quan trong thời kỳ quá độ lên CNXH. Sự tìm kiếm giá trị thặng dư kích thích thu hút đầu tư, công nghệ, giải phóng sức sản xuất và giải quyết việc làm. Nhà nước định hướng XHCN quản lý bằng pháp luật để hài hòa lợi ích và bảo đảm công bằng xã hội.'
  }
];
