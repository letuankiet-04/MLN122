import { ActiveRecallItem } from '../types/textbook';

export const ACTIVE_RECALL_ITEMS: ActiveRecallItem[] = [
  {
    id: 'ar-1',
    question: 'Vì sao trao đổi ngang giá không thể tạo ra giá trị thặng dư trên phạm vi toàn xã hội?',
    context: 'Nghiên cứu mâu thuẫn trong công thức chung của tư bản (T – H – T′)',
    sectionId: '3.1.1',
    modelAnswer: 'Trong trao đổi ngang giá, tổng giá trị của hai bên tham gia trao đổi là hoàn toàn bằng nhau, chỉ có hình thái giá trị thay đổi từ tiền sang hàng và từ hàng sang tiền. Không có bất kỳ lượng giá trị mới nào dôi ra ngoài hai lượng giá trị đã có từ trước khi bước vào lưu thông. Do đó, trao đổi ngang giá không thể sinh ra giá trị thặng dư.',
    criteria: [
      'Nêu rõ bản chất trao đổi ngang giá: giá trị hai bên bằng nhau (A = B).',
      'Chỉ ra lưu thông chỉ làm thay đổi hình thái biểu hiện (tiền ⇄ hàng), không làm thay đổi tổng lượng giá trị.',
      'Khẳng định kết luận: không thể tạo ra giá trị mới hay giá trị thặng dư trong lưu thông ngang giá.'
    ]
  },
  {
    id: 'ar-2',
    question: 'Tại sao sức lao động là hàng hóa đặc biệt khác biệt hoàn toàn với hàng hóa thông thường?',
    context: 'Hàng hóa sức lao động và hai thuộc tính',
    sectionId: '3.1.1',
    modelAnswer: 'Sức lao động là hàng hóa đặc biệt vì 3 lý do căn bản: (1) Nó gắn liền với cơ thể sống của con người, không thể tách rời; (2) Giá trị của nó ngoài yếu tố vật chất (tư liệu sinh hoạt, đào tạo) còn bao hàm yếu tố tinh thần và lịch sử của mỗi dân tộc; (3) Quan trọng nhất là giá trị sử dụng đặc biệt của nó: khi được tiêu dùng (quá trình lao động), nó không mất đi mà lại sáng tạo ra một lượng giá trị mới lớn hơn giá trị của chính nó (Giá trị mới = v + m).',
    criteria: [
      'Chỉ rõ tính gắn liền với cơ thể sống của con người (người bán chỉ bán quyền sử dụng).',
      'Đề cập yếu tố lịch sử và tinh thần trong cấu thành giá trị sức lao động.',
      'Nhấn mạnh giá trị sử dụng độc nhất vô nhị: sáng tạo ra giá trị mới lớn hơn giá trị bản thân (v + m).'
    ]
  },
  {
    id: 'ar-3',
    question: 'Phân tích sự khác nhau căn bản giữa Tư bản bất biến (c) và Tư bản khả biến (v). Ý nghĩa của sự phân chia này?',
    context: 'Cơ cấu giá trị hàng hóa và nguồn gốc của giá trị thặng dư',
    sectionId: '3.1.1',
    modelAnswer: 'Tư bản bất biến (c) là bộ phận tư bản tồn tại dưới hình thái tư liệu sản xuất; giá trị của nó được bảo tồn và chuyển nguyên vẹn vào sản phẩm mới thông qua lao động cụ thể của công nhân, không thay đổi về lượng. Tư bản khả biến (v) là bộ phận dùng để mua sức lao động; trong quá trình sản xuất thông qua lao động trừu tượng, người công nhân tái tạo ra giá trị của nó và tạo ra giá trị thặng dư dôi ra (v → v + m). Ý nghĩa: vạch trần nguồn gốc duy nhất sinh ra m là lao động sống của công nhân (v), máy móc tư bản (c) chỉ là phương tiện/điều kiện.',
    criteria: [
      'Phân biệt hình thái tồn tại: c là tư liệu sản xuất, v là sức lao động.',
      'Phân biệt cơ chế chuyển dịch: c chuyển nguyên vẹn không đổi lượng, v biến đổi tăng thêm (v + m).',
      'Nêu rõ vai trò của hai mặt lao động sản xuất: lao động cụ thể chuyển dịch c, lao động trừu tượng tạo ra v + m.',
      'Nêu đúng ý nghĩa: chứng minh lao động sống là nguồn gốc duy nhất của giá trị thặng dư.'
    ]
  },
  {
    id: 'ar-4',
    question: 'So sánh cơ chế làm tăng tỷ suất giá trị thặng dư giữa phương pháp Tuyệt đối và Tương đối?',
    context: 'Các phương pháp sản xuất giá trị thặng dư',
    sectionId: '3.1.3',
    modelAnswer: 'Phương pháp Tuyệt đối làm tăng m′ bằng cách kéo dài độ dài ngày lao động vượt quá thời gian lao động tất yếu (t), trong khi thời gian tất yếu t được giữ nguyên. Phương pháp này bị giới hạn bởi sinh lý con người và pháp luật. Ngược lại, phương pháp Tương đối giữ nguyên độ dài ngày lao động, làm tăng m′ bằng cách rút ngắn thời gian lao động tất yếu (t) nhờ tăng năng suất lao động xã hội (làm giảm giá trị tư liệu sinh hoạt), từ đó kéo dài thời gian lao động thặng dư (t′) một cách tương ứng.',
    criteria: [
      'Nêu rõ cơ chế phương pháp Tuyệt đối: kéo dài ngày làm việc, t giữ nguyên.',
      'Nêu rõ cơ chế phương pháp Tương đối: giữ nguyên ngày làm việc, rút ngắn t bằng tăng năng suất lao động xã hội.',
      'Chỉ ra các giới hạn của phương pháp tuyệt đối (sinh lý, xã hội, pháp lý).',
      'Chỉ ra cơ chế giảm giá trị tư liệu sinh hoạt trong phương pháp tương đối.'
    ]
  },
  {
    id: 'ar-5',
    question: 'Tại sao AI, robot và tự động hóa trong Cách mạng công nghiệp 4.0 không trực tiếp tạo ra giá trị mới theo lý luận của C. Mác?',
    context: 'Liên hệ Cách mạng công nghiệp 4.0 và thực tiễn hiện đại',
    sectionId: '3.2',
    modelAnswer: 'Theo C. Mác, AI và robot bản chất là máy móc thiết bị tinh xảo, thuộc về Tư bản bất biến (c). Giá trị của chúng là lao động quá khứ đã kết tinh từ trước, trong sản xuất chúng chỉ chuyển dịch dần phần giá trị hao mòn của chính mình vào sản phẩm. Robot không có nhu cầu sinh hoạt để tái sản xuất sức lao động và không có ý thức xã hội. Nguồn gốc duy nhất tạo ra giá trị mới vẫn là lao động sống của con người (lao động trí tuệ phức tạp của lập trình viên, kỹ sư, chuyên gia vận hành).',
    criteria: [
      'Xác định đúng AI và robot thuộc phạm trù Tư bản bất biến (c).',
      'Chỉ ra chúng chỉ chuyển dịch giá trị hao mòn cũ, không thể tự sinh ra lượng giá trị mới vượt quá bản thân.',
      'Khẳng định nguồn gốc duy nhất của giá trị mới là lao động sống của con người (lao động trí tuệ, kỹ thuật cao).'
    ]
  }
];
