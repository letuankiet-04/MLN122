export interface ChapterSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  objectives: string[];
  summary: string;
  hasInteractiveModule?: string; // id of embedded interactive component
  content: {
    lead: string;
    blocks: {
      type: 'paragraph' | 'definition' | 'proposition' | 'explanation' | 'example' | 'table' | 'remember' | 'interactive' | 'formula';
      title?: string;
      content?: string;
      math?: string;
      tableData?: {
        headers: string[];
        rows: string[][];
      };
      interactiveId?: string;
    }[];
  };
}

export const CHAPTER_INFO = {
  code: "CHƯƠNG 3",
  title: "Giá trị thặng dư trong nền kinh tế thị trường",
  course: "Kinh tế chính trị Mác – Lênin",
  author: "Học thuyết kinh tế C. Mác",
  totalSections: 6,
  estimatedHours: "4.5 giờ",
  overview: "Chương này trình bày toàn bộ lý luận khoa học của C. Mác về nguồn gốc, bản chất và các phương pháp sản xuất giá trị thặng dư — hòn đá tảng trong toàn bộ học thuyết kinh tế của ông, đồng thời làm rõ sự vận động của quy luật này trong bối cảnh Cách mạng công nghiệp 4.0 và thực tiễn phát triển kinh tế thị trường định hướng XHCN tại Việt Nam.",
};

export const CHAPTER_SECTIONS: ChapterSection[] = [
  {
    id: "3.1",
    number: "3.1",
    title: "Lý luận của C. Mác về giá trị thặng dư",
    subtitle: "Nền tảng học thuyết kinh tế chính trị Mác – Lênin",
    estimatedMinutes: 20,
    objectives: [
      "Hiểu rõ vị trí trung tâm của học thuyết giá trị thặng dư trong kinh tế chính trị Mác – Lênin.",
      "Nắm được cấu trúc logic từ nguồn gốc, bản chất đến các phương pháp sản xuất giá trị thặng dư.",
      "Nhận thức được ý nghĩa phương pháp luận của việc nghiên cứu giá trị thặng dư."
    ],
    summary: "Học thuyết giá trị thặng dư là 'hòn đá tảng' trong toàn bộ hệ thống lý luận kinh tế của C. Mác, vạch trần bản chất bóc lột của phương thức sản xuất tư bản chủ nghĩa.",
    content: {
      lead: "Học thuyết giá trị thặng dư là phát kiến vĩ đại thứ hai của C. Mác (cùng với Chủ nghĩa duy vật lịch sử). Đây là 'hòn đá tảng' trong toàn bộ hệ thống lý luận kinh tế của ông, vạch trần bản chất kinh tế của phương thức sản xuất tư bản chủ nghĩa, chứng minh quy luật vận động kinh tế của xã hội hiện đại.",
      blocks: [
        {
          type: 'proposition',
          title: 'Luận điểm quan trọng của V.I. Lênin',
          content: 'Học thuyết giá trị thặng dư là hòn đá tảng của học thuyết kinh tế của Mác. Nó chỉ ra nguồn gốc sâu xa của sự giàu có trong chủ nghĩa tư bản không phải do lưu thông, mua bán hay sự hảo tâm của tự nhiên, mà xuất phát từ việc chiếm đoạt lao động không công của giai cấp công nhân.'
        },
        {
          type: 'paragraph',
          content: 'Để đi đến kết luận khoa học về bản chất của phương thức sản xuất tư bản chủ nghĩa, C. Mác đã bắt đầu từ phân tích hàng hóa — tế bào kinh tế của xã hội tư bản, đi qua tiền tệ, rồi phân tích quá trình tiền tệ chuyển hóa thành tư bản và nguồn gốc ra đời của giá trị thặng dư.'
        },
        {
          type: 'definition',
          title: 'Khái quát phạm trù Giá trị thặng dư',
          content: 'Giá trị thặng dư (ký hiệu là m, viết tắt từ Mehrwert trong tiếng Đức) là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động do người lao động làm thuê tạo ra và bị nhà tư bản chiếm đoạt không bồi hoàn.'
        },
        {
          type: 'remember',
          title: 'Cấu trúc logic của chương',
          content: 'Chương 3 được triển khai theo 3 nhánh lý luận cốt lõi: (1) Nguồn gốc của giá trị thặng dư (sức lao động là hàng hóa đặc biệt); (2) Bản chất của giá trị thặng dư (quan hệ bóc lột giai cấp); (3) Các phương pháp sản xuất giá trị thặng dư (tuyệt đối, tương đối, siêu ngạch) cùng liên hệ thực tiễn hiện đại.'
        }
      ]
    }
  },
  {
    id: "3.1.1",
    number: "3.1.1",
    title: "Nguồn gốc của giá trị thặng dư",
    subtitle: "Công thức chung của tư bản, mâu thuẫn và hàng hóa sức lao động",
    estimatedMinutes: 60,
    hasInteractiveModule: "cotton-simulator",
    objectives: [
      "Phân tích sự khác biệt giữa hai công thức lưu thông H–T–H và T–H–T′.",
      "Hiểu rõ mâu thuẫn trong công thức chung của tư bản và chìa khóa giải quyết mâu thuẫn.",
      "Nắm vững 2 điều kiện và 2 thuộc tính của hàng hóa sức lao động.",
      "Phân tích quá trình sản xuất giá trị thặng dư qua ví dụ tính toán kéo sợi bông kinh điển.",
      "Phân biệt tư bản bất biến (c) và tư bản khả biến (v), ý nghĩa của sự phân chia."
    ],
    summary: "Giá trị thặng dư bắt nguồn từ việc nhà tư bản tìm thấy trên thị trường một thứ hàng hóa đặc biệt: hàng hóa sức lao động, thứ có khả năng tạo ra một lượng giá trị mới lớn hơn giá trị của chính nó.",
    content: {
      lead: "Mọi tư bản ban đầu đều biểu hiện dưới hình thái một số tiền nhất định. Nhưng bản thân tiền tự nó không phải là tư bản. Tiền chỉ biến thành tư bản khi nó được vận động theo một phương thức đặc thù nhằm mục đích làm tăng thêm giá trị.",
      blocks: [
        {
          type: 'proposition',
          title: '1. Công thức chung của tư bản',
          content: 'Tiền trong lưu thông hàng hóa giản đơn vận động theo công thức: H – T – H (Hàng – Tiền – Hàng). Ngược lại, tiền với tư cách là tư bản vận động theo công thức: T – H – T′ (Tiền – Hàng – Tiền′), trong đó T′ = T + t (với t > 0 là số tiền trội hơn, gọi là giá trị thặng dư, ký hiệu là m).'
        },
        {
          type: 'interactive',
          interactiveId: 'capital-circulation'
        },
        {
          type: 'table',
          title: 'Bảng so sánh: Lưu thông hàng hóa giản đơn (H–T–H) và Lưu thông tư bản (T–H–T′)',
          tableData: {
            headers: ["Tiêu chí so sánh", "Lưu thông hàng hóa giản đơn (H – T – H)", "Lưu thông tư bản (T – H – T′)"],
            rows: [
              ["Điểm khởi đầu và kết thúc", "Bắt đầu bằng Hàng và kết thúc bằng Hàng.", "Bắt đầu bằng Tiền và kết thúc bằng Tiền."],
              ["Yếu tố trung gian", "Tiền đóng vai trò trung gian trao đổi (H – T – H).", "Hàng hóa đóng vai trò trung gian chuyển hóa (T – H – T′)."],
              ["Mục đích vận động", "Mục đích là Giá trị sử dụng để thỏa mãn nhu cầu tiêu dùng.", "Mục đích là Giá trị và Giá trị tăng thêm (Giá trị thặng dư m)."],
              ["Giới hạn vận động", "Có giới hạn: kết thúc khi người bán nhận được hàng hóa cần dùng.", "Không có giới hạn: tiền thu về lại tiếp tục ứng ra để thu về số tiền lớn hơn nữa."],
              ["Vận động của giá trị", "Hai đầu mút có cùng giá trị nhưng khác nhau về giá trị sử dụng.", "Hai đầu mút giống nhau về chất (đều là tiền) nhưng khác nhau về lượng (T′ > T)."]
            ]
          }
        },
        {
          type: 'explanation',
          title: 'Vì sao tiền trở thành tư bản?',
          content: 'Tiền tự nó không sinh ra tiền. Tiền chỉ trở thành tư bản khi được ném vào lưu thông với mục đích thu được giá trị thặng dư bằng cách mua sắm tư liệu sản xuất và bóc lột sức lao động của người làm thuê. Do đó, công thức T – H – T′ được gọi là công thức chung của tư bản vì mọi loại tư bản (tư bản công nghiệp, tư bản thương nghiệp, tư bản cho vay) đều vận động theo quy luật này.'
        },
        {
          type: 'proposition',
          title: '2. Mâu thuẫn của công thức chung của tư bản',
          content: 'Nhìn bề ngoài của công thức T – H – T′, dường như giá trị thặng dư được sinh ra ngay trong quá trình lưu thông. Tuy nhiên, C. Mác đã chứng minh bằng lập luận biện chứng chặt chẽ rằng: Lưu thông và bản thân tiền tệ trong lưu thông không tạo ra bất kỳ giá trị mới nào.'
        },
        {
          type: 'interactive',
          interactiveId: 'contradiction-explorer'
        },
        {
          type: 'definition',
          title: 'Kết luận biện chứng về Mâu thuẫn của công thức chung',
          content: 'Tư bản không thể xuất hiện từ lưu thông và cũng không thể xuất hiện ở bên ngoài lưu thông. Nó phải xuất hiện trong lưu thông và đồng thời không phải trong lưu thông.'
        },
        {
          type: 'explanation',
          title: 'Chìa khóa giải quyết mâu thuẫn: Hàng hóa sức lao động',
          content: 'Để giải quyết mâu thuẫn này, nhà tư bản phải tìm được trên thị trường một thứ hàng hóa đặc biệt, mà giá trị sử dụng của nó có đặc tính kỳ diệu: khi tiêu dùng, nó sáng tạo ra một lượng giá trị mới lớn hơn giá trị của bản thân nó. Thứ hàng hóa đặc biệt duy nhất đó chính là HÀNG HÓA SỨC LAO ĐỘNG.'
        },
        {
          type: 'proposition',
          title: '3. Hàng hóa sức lao động — Điều kiện và hai thuộc tính',
          content: 'Sức lao động hay năng lực lao động là toàn bộ những năng lực thể chất và tinh thần tồn tại trong cơ thể, trong một con người đang sống, và được người đó đem ra vận dụng mỗi khi sản xuất ra một giá trị sử dụng nào đó.'
        },
        {
          type: 'interactive',
          interactiveId: 'labor-power'
        },
        {
          type: 'table',
          title: 'Bảng so sánh: Hàng hóa thông thường và Hàng hóa sức lao động',
          tableData: {
            headers: ["Thuộc tính", "Hàng hóa thông thường (vải, gạo, sắt vụn...)", "Hàng hóa sức lao động"],
            rows: [
              ["Bản chất chủ thể", "Tách rời khỏi cơ thể người sống, là vật phẩm vật chất.", "Gắn liền với cơ thể sống của con người, không thể tách rời."],
              ["Nguồn gốc giá trị", "Được đo thuần túy bằng hao phí lao động vật chất sản xuất ra nó.", "Gồm 3 bộ phận tư liệu sinh hoạt + phí đào tạo + nuôi gia đình công nhân."],
              ["Yếu tố cấu thành", "Hoàn toàn là yếu tố vật chất kỹ thuật.", "Chứa đựng cả yếu tố lịch sử, tinh thần và trình độ văn minh của dân tộc."],
              ["Quá trình tiêu dùng", "Bị hao mòn hoặc tiêu hủy dần về giá trị sử dụng và giá trị.", "Sáng tạo ra giá trị mới lớn hơn giá trị của chính nó: Giá trị mới = v + m."],
              ["Quan hệ mua bán", "Người mua nhận hàng và sở hữu vĩnh viễn quyền sở hữu vật phẩm.", "Người mua chỉ thuê quyền sử dụng trong thời gian nhất định (theo giờ, ngày)."]
            ]
          }
        },
        {
          type: 'proposition',
          title: '4. Sự sản xuất giá trị thặng dư — Ví dụ kéo sợi bông kinh điển',
          content: 'Quá trình sản xuất tư bản chủ nghĩa là sự thống nhất giữa quá trình sản xuất ra giá trị sử dụng và quá trình sản xuất ra giá trị thặng dư. C. Mác đã sử dụng ví dụ về xưởng kéo sợi bông để vạch trần bí quyết này.'
        },
        {
          type: 'interactive',
          interactiveId: 'cotton-simulator'
        },
        {
          type: 'example',
          title: 'Tính toán chi tiết ví dụ kéo sợi bông (Ngày lao động 8 giờ)',
          content: 'Giả định nhà tư bản thuê công nhân làm việc trong 8 giờ/ngày. Để kéo được 10 kg sợi cần 10 kg bông giá 100 USD; hao mòn máy móc là 6 USD. Giá trị sức lao động của công nhân trong 1 ngày (8 giờ) là 15 USD. Trong 1 giờ lao động, công nhân sáng tạo ra lượng giá trị mới là 3.75 USD.\n\n' +
            '• TRONG 4 GIỜ ĐẦU (Thời gian lao động tất yếu - t):\n' +
            'Công nhân kéo 10 kg bông thành 10 kg sợi. Hao phí sản xuất:\n' +
            '  - Giá trị bông chuyển vào sợi: 100 USD (c1)\n' +
            '  - Hao mòn máy móc chuyển vào sợi: 6 USD (c2)\n' +
            '  - Giá trị mới công nhân sáng tạo ra (4h × 3.75 USD): 15 USD (v)\n' +
            '  => Tổng giá trị 10 kg sợi: 100 + 6 + 15 = 121 USD.\n' +
            '  => Số tiền nhà tư bản ứng ra: 100 (bông) + 6 (hao mòn) + 15 (tiền thuê sức lao động cả ngày) = 121 USD.\n' +
            '  => Tại điểm này: Giá trị sản phẩm (121 USD) đúng bằng tư bản ứng trước (121 USD). Nhà tư bản chưa có giá trị thặng dư nào (m = 0). Nếu quá trình dừng lại ở đây, tiền chưa biến thành tư bản.\n\n' +
            '• TRONG 4 GIỜ TIẾP THEO (Thời gian lao động thặng dư - t′):\n' +
            'Nhà tư bản không cho công nhân nghỉ, vì hợp đồng mua sức lao động là trọn 1 ngày 8 giờ. Công nhân tiếp tục kéo thêm 10 kg bông nữa:\n' +
            '  - Giá trị bông chuyển vào: 100 USD\n' +
            '  - Hao mòn máy móc chuyển vào: 6 USD\n' +
            '  - Giá trị mới công nhân sáng tạo thêm trong 4 giờ này: 15 USD. Nhưng khoản 15 USD này nhà tư bản KHÔNG PHẢI TRẢ TIỀN THÊM, vì đã trả 15 USD cho cả ngày công.\n\n' +
            '• TỔNG KẾT TOÀN BỘ NGÀY LAO ĐỘNG 8 GIỜ:\n' +
            '  - Tổng tư bản ứng trước (C) = 100 (bông) + 6 (máy) + 15 (sức lao động) = 121 USD (cho ca sản xuất chuẩn) hoặc tính toàn bộ 2 ca = 227 USD.\n' +
            '  - Theo ví dụ chuẩn tắc của giáo trình:\n' +
            '    + Chi phí bông: 100 USD\n' +
            '    + Hao mòn máy móc: 6 USD\n' +
            '    + Giá trị sức lao động (v): 15 USD\n' +
            '    + Tổng tư bản ứng trước: 100 + 6 + 15 = 121 USD\n' +
            '    + Giá trị mới do công nhân tạo ra trong cả ngày: 30 USD\n' +
            '    + Tổng giá trị sản phẩm: 100 + 6 + 30 = 136 USD\n' +
            '    + Giá trị thặng dư (m): 136 - 121 = 15 USD!\n' +
            '  => Tỷ suất giá trị thặng dư: m′ = (15 / 15) × 100% = 100%.'
        },
        {
          type: 'proposition',
          title: '5. Tư bản bất biến (c) và Tư bản khả biến (v)',
          content: 'Để sản xuất giá trị thặng dư, nhà tư bản phải ứng tiền mua tư liệu sản xuất và mua sức lao động. C. Mác căn cứ vào vai trò khác nhau của từng bộ phận tư bản trong việc tạo ra giá trị thặng dư để chia tư bản thành hai bộ phận: Tư bản bất biến (c) và Tư bản khả biến (v).'
        },
        {
          type: 'interactive',
          interactiveId: 'constant-variable'
        },
        {
          type: 'table',
          title: 'Bảng so sánh: Tư bản bất biến (c) và Tư bản khả biến (v)',
          tableData: {
            headers: ["Tiêu chí phân biệt", "Tư bản bất biến (c)", "Tư bản khả biến (v)"],
            rows: [
              ["Hình thái tồn tại", "Tồn tại dưới dạng tư liệu sản xuất (nhà xưởng, thiết bị, nguyên vật liệu, nhiên liệu).", "Tồn tại dưới dạng sức lao động của công nhân làm thuê."],
              ["Cơ chế chuyển dịch giá trị", "Giá trị cũ được bảo tồn và chuyển nguyên vẹn vào sản phẩm mới thông qua lao động cụ thể của công nhân.", "Không chuyển dịch giá trị cũ, mà bị biến mất trong tiêu dùng; thông qua lao động trừu tượng, công nhân tái tạo ra giá trị mới."],
              ["Sự biến đổi về lượng", "Không thay đổi về lượng giá trị trong quá trình sản xuất (lượng giá trị chuyển vào đúng bằng hao phí).", "Biến đổi tăng thêm về lượng giá trị trong quá trình sản xuất (từ v ban đầu trở thành v + m)."],
              ["Vai trò đối với m", "Là điều kiện vật chất không thể thiếu để sản xuất ra giá trị thặng dư, nhưng bản thân nó không tạo ra m.", "Là nguồn gốc trực tiếp và duy nhất sinh ra giá trị thặng dư (m)."],
              ["Công thức giá trị hàng hóa", "Bộ phận c trong công thức: G = c + v + m.", "Bộ phận v trong công thức: G = c + v + m."]
            ]
          }
        },
        {
          type: 'definition',
          title: 'Ý nghĩa khoa học của sự phân chia c và v',
          content: 'Việc phân chia tư bản thành tư bản bất biến (c) và tư bản khả biến (v) có ý nghĩa to lớn: Nó vạch trần luận điệu tư sản cho rằng máy móc sinh ra giá trị thặng dư. Máy móc chỉ là công cụ để hút lao động sống; nguồn gốc duy nhất của giá trị thặng dư là lao động không công của công nhân làm thuê.'
        },
        {
          type: 'proposition',
          title: '6. Bản chất của tiền công trong chủ nghĩa tư bản',
          content: 'Trong nền kinh tế thị trường tư bản chủ nghĩa, tiền công biểu hiện bề ngoài như là "giá cả của lao động". Nhưng thực chất khoa học, tiền công không phải là giá cả của lao động, mà là GIÁ CẢ CỦA HÀNG HÓA SỨC LAO ĐỘNG.'
        },
        {
          type: 'explanation',
          title: 'Vì sao tiền công che đậy sự bóc lột?',
          content: 'Lao động không phải là hàng hóa, vì lao động là quá trình tiêu dùng sức lao động, chưa kết thúc thì chưa tồn tại dưới dạng vật phẩm trao đổi. Hình thức biểu hiện sai lệch "tiền công là giá cả lao động" khiến người công nhân lầm tưởng rằng mọi giờ làm việc của mình đều được trả công đầy đủ, che giấu sự phân chia ngày lao động thành thời gian lao động tất yếu (được trả công) và thời gian lao động thặng dư (bị nhà tư bản chiếm đoạt không bồi hoàn).'
        }
      ]
    }
  },
  {
    id: "3.1.2",
    number: "3.1.2",
    title: "Bản chất của giá trị thặng dư",
    subtitle: "Tỷ suất, khối lượng giá trị thặng dư và sự chuyển hóa thành lợi nhuận",
    estimatedMinutes: 50,
    hasInteractiveModule: "surplus-calculator",
    objectives: [
      "Nắm vững định nghĩa bản chất kinh tế - xã hội của giá trị thặng dư.",
      "Làm chủ 2 công thức tính tỷ suất giá trị thặng dư (m′) và công thức tính khối lượng giá trị thặng dư (M).",
      "Phân biệt rạch ròi giữa Giá trị thặng dư (m) và Lợi nhuận (p).",
      "Hiểu rõ chi phí sản xuất tư bản chủ nghĩa (k = c + v) và sự xuyên tạc bản chất bóc lột của phạm trù lợi nhuận."
    ],
    summary: "Giá trị thặng dư phản ánh mối quan hệ bóc lột giữa nhà tư bản và lao động làm thuê. Tỷ suất m′ đo lường trình độ bóc lột, khối lượng M đo lường quy mô bóc lột. Lợi nhuận (p) là hình thái biểu hiện bề ngoài che giấu bản chất của m.",
    content: {
      lead: "Nghiên cứu bản chất của giá trị thặng dư là đi sâu vào bản chất của quan hệ sản xuất tư bản chủ nghĩa — mối quan hệ giữa giai cấp các nhà tư bản chiếm đoạt tư liệu sản xuất và giai cấp công nhân làm thuê không có tư liệu sản xuất.",
      blocks: [
        {
          type: 'definition',
          title: 'Bản chất kinh tế của Giá trị thặng dư',
          content: 'Giá trị thặng dư là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động do người lao động làm thuê tạo ra và bị nhà tư bản chiếm đoạt không bồi hoàn. Nó phản ánh bản chất quan hệ sản xuất tư bản chủ nghĩa: quan hệ bóc lột của giai cấp tư sản đối với giai cấp công nhân.'
        },
        {
          type: 'proposition',
          title: 'Tỷ suất giá trị thặng dư (m′) và Khối lượng giá trị thặng dư (M)',
          content: 'Để đo lường trình độ và quy mô bóc lột giá trị thặng dư, C. Mác đưa ra hai phạm trù định lượng cơ bản: Tỷ suất giá trị thặng dư (m′) và Khối lượng giá trị thặng dư (M).'
        },
        {
          type: 'interactive',
          interactiveId: 'surplus-calculator'
        },
        {
          type: 'explanation',
          title: 'Ý nghĩa của hai công thức tính tỷ suất m′',
          content: '• Công thức 1: m′ = (m / v) × 100% (tính theo tỷ lệ lượng giá trị thặng dư so với tư bản khả biến ứng trước).\n' +
            '• Công thức 2: m′ = (t′ / t) × 100% (tính theo tỷ lệ giữa thời gian lao động thặng dư t′ so với thời gian lao động tất yếu t).\n' +
            'Cả hai công thức đều phản ánh cùng một bản chất: TRÌNH ĐỘ BÓC LỘT của nhà tư bản đối với công nhân làm thuê. Tỷ suất m′ càng cao thì công nhân càng phải làm nhiều thời gian không công cho nhà tư bản.'
        },
        {
          type: 'formula',
          title: 'Công thức tính khối lượng giá trị thặng dư (M)',
          math: "M = m' \\times V = \\frac{m}{v} \\times V",
          content: 'Trong đó V là tổng số tư bản khả biến được sử dụng trong toàn bộ doanh nghiệp hay ngành. Khối lượng M nói lên QUY MÔ BÓC LỘT của nhà tư bản đối với tập thể giai cấp công nhân.'
        },
        {
          type: 'proposition',
          title: 'Chi phí sản xuất tư bản chủ nghĩa và Sự chuyển hóa giá trị thặng dư thành Lợi nhuận',
          content: 'Để sản xuất ra hàng hóa, hao phí lao động thực tế của xã hội là: G = c + v + m. Nhưng đối với nhà tư bản, họ chỉ cần bỏ ra một khoản tiền để mua tư liệu sản xuất (c) và mua sức lao động (v). Khoản chi phí đó được gọi là Chi phí sản xuất tư bản chủ nghĩa (k):'
        },
        {
          type: 'formula',
          title: 'Chi phí sản xuất tư bản chủ nghĩa',
          math: "k = c + v \\implies G = k + m",
          content: 'Chi phí sản xuất tư bản chủ nghĩa (k) chỉ bù đắp hao phí tư bản của nhà tư bản, chứ không bù đắp hao phí lao động thực tế của xã hội để sản xuất ra hàng hóa.'
        },
        {
          type: 'explanation',
          title: 'Sự hình thành Lợi nhuận (p) và sự che đậy bản chất bóc lột',
          content: 'Khi bán hàng hóa trên thị trường theo đúng giá trị (G = k + m), sau khi trừ đi chi phí sản xuất k, nhà tư bản thu về một khoản tiền dôi ra. Khoản chênh lệch này biểu hiện bề ngoài dưới hình thức LỢI NHUẬN (ký hiệu là p).\n\n' +
            'Khi đó công thức giá trị trở thành: G = k + p.\n' +
            'Lợi nhuận thực chất là giá trị thặng dư nhưng được quan niệm như là con đẻ của toàn bộ tư bản ứng trước (k = c + v), chứ không riêng gì tư bản khả biến (v). Chính vì vậy, phạm trù lợi nhuận đã xóa nhòa và che đậy hoàn toàn nguồn gốc bóc lột thật sự của giá trị thặng dư.'
        },
        {
          type: 'table',
          title: 'Bảng so sánh: Giá trị thặng dư (m) và Lợi nhuận (p)',
          tableData: {
            headers: ["Tiêu chí so sánh", "Giá trị thặng dư (m)", "Lợi nhuận (p)"],
            rows: [
              ["Về bản chất", "Là thực chất bên trong: phần giá trị mới do lao động sống của công nhân tạo ra dôi ra ngoài giá trị sức lao động.", "Là hình thái biểu hiện bề ngoài của m trên thị trường thông qua quan hệ mua bán."],
              ["Nguồn gốc sinh ra", "Chỉ do tư bản khả biến (v) sinh ra, bắt nguồn từ thời gian lao động thặng dư của công nhân.", "Được nhà tư bản quan niệm là do toàn bộ tư bản ứng trước (k = c + v) sinh ra."],
              ["Ý nghĩa xã hội", "Vạch rõ quan hệ bóc lột giai cấp giữa tư bản và lao động.", "Che giấu thực chất bóc lột, biến quan hệ giai cấp thành quan hệ kinh doanh bình đẳng."],
              ["Mối quan hệ về lượng", "Cố định theo lượng hao phí lao động trừu tượng thực tế.", "Biến động theo cung - cầu thị trường: p có thể bằng m (giá cả = giá trị), p > m (giá cả > giá trị), hoặc p < m (giá cả < giá trị)."],
              ["Quy mô toàn xã hội", "Tổng giá trị thặng dư toàn xã hội (Σm).", "Tổng lợi nhuận toàn xã hội luôn bằng tổng giá trị thặng dư: Σp = Σm."]
            ]
          }
        }
      ]
    }
  },
  {
    id: "3.1.3",
    number: "3.1.3",
    title: "Các phương pháp sản xuất giá trị thặng dư",
    subtitle: "Giá trị thặng dư tuyệt đối, tương đối và giá trị thặng dư siêu ngạch",
    estimatedMinutes: 50,
    hasInteractiveModule: "methods-simulator",
    objectives: [
      "Phân tích cơ chế và điều kiện sản xuất giá trị thặng dư tuyệt đối, các giới hạn tự nhiên và xã hội.",
      "Phân tích cơ chế sản xuất giá trị thặng dư tương đối thông qua tăng năng suất lao động xã hội.",
      "Hiểu rõ bản chất của giá trị thặng dư siêu ngạch và mối quan hệ với giá trị thặng dư tương đối.",
      "So sánh toàn diện 3 phương pháp sản xuất giá trị thặng dư."
    ],
    summary: "Nhà tư bản nâng cao tỷ suất bóc lột bằng hai phương pháp cơ bản: kéo dài ngày lao động (tuyệt đối) hoặc rút ngắn thời gian lao động tất yếu bằng cách tăng năng suất lao động xã hội (tương đối). Giá trị thặng dư siêu ngạch là động lực mạnh mẽ nhất thúc đẩy tiến bộ kỹ thuật.",
    content: {
      lead: "Để không ngừng gia tăng giá trị thặng dư và chiến thắng trong cạnh tranh, các nhà tư bản sử dụng nhiều phương pháp khác nhau để nâng cao tỷ suất giá trị thặng dư (m′). Trong lịch sử phát triển của chủ nghĩa tư bản, có hai phương pháp cơ bản: sản xuất giá trị thặng dư tuyệt đối và sản xuất giá trị thặng dư tương đối.",
      blocks: [
        {
          type: 'proposition',
          title: '1. Phương pháp sản xuất giá trị thặng dư tuyệt đối',
          content: 'Sản xuất giá trị thặng dư tuyệt đối là phương pháp sản xuất giá trị thặng dư thu được do KÉO DÀI NGÀY LAO ĐỘNG vượt quá thời gian lao động tất yếu, trong khi thời gian lao động tất yếu không thay đổi.'
        },
        {
          type: 'example',
          title: 'Mô hình số liệu giá trị thặng dư tuyệt đối',
          content: '• Ban đầu: Ngày lao động 8 giờ, gồm 4 giờ tất yếu (t = 4h) và 4 giờ thặng dư (t′ = 4h).\n' +
            '  => Tỷ suất giá trị thặng dư m′ = (4 / 4) × 100% = 100%.\n\n' +
            '• Kéo dài ngày lao động thêm 2 giờ thành 10 giờ: Thời gian lao động tất yếu vẫn là 4h (t = 4h), còn thời gian lao động thặng dư tăng lên 6h (t′ = 6h).\n' +
            '  => Tỷ suất giá trị thặng dư mới m′ = (6 / 4) × 100% = 150%.\n' +
            'Nhà tư bản đã thu thêm được 50% tỷ suất giá trị thặng dư nhờ kéo dài ngày lao động.'
        },
        {
          type: 'interactive',
          interactiveId: 'methods-simulator'
        },
        {
          type: 'explanation',
          title: 'Các giới hạn của phương pháp sản xuất giá trị thặng dư tuyệt đối',
          content: 'Nhà tư bản luôn tìm mọi cách kéo dài ngày làm việc đến mức tối đa (thậm chí 14–16 giờ trong giai đoạn đầu của CNTB). Tuy nhiên, ngày lao động bị giới hạn bởi hai yếu tố khách quan:\n' +
            '1. Giới hạn tự nhiên (thể chất & sinh lý): Người công nhân phải có thời gian ăn, ngủ, nghỉ ngơi để phục hồi năng lượng sống.\n' +
            '2. Giới hạn xã hội (tinh thần & văn hóa): Con người cần thời gian chăm sóc gia đình, giao tiếp xã hội, học tập nâng cao dân trí.\n' +
            '3. Giới hạn pháp lý và đấu tranh giai cấp: Sự kháng cự quyết liệt của phong trào công nhân (như cuộc đấu tranh ngày 1/5/1886 đòi ngày làm việc 8 giờ) buộc nhà nước tư sản phải ban hành luật giới hạn độ dài ngày làm việc.'
        },
        {
          type: 'proposition',
          title: '2. Phương pháp sản xuất giá trị thặng dư tương đối',
          content: 'Khi độ dài ngày lao động đã bị pháp luật cố định, nhà tư bản chuyển sang phương pháp sản xuất giá trị thặng dư tương đối. Đây là phương pháp sản xuất giá trị thặng dư thu được do RÚT NGẮN THỜI GIAN LAO ĐỘNG TẤT YẾU bằng cách tăng năng suất lao động xã hội, nhờ đó kéo dài thời gian lao động thặng dư trong điều kiện độ dài ngày lao động không đổi.'
        },
        {
          type: 'example',
          title: 'Mô hình số liệu giá trị thặng dư tương đối',
          content: '• Ban đầu: Ngày lao động 8 giờ (t = 4h, t′ = 4h, m′ = 100%).\n' +
            '• Nhờ tiến bộ kỹ thuật làm tăng năng suất lao động xã hội, giá trị tư liệu sinh hoạt giảm xuống một nửa, làm cho thời gian lao động tất yếu giảm từ 4h xuống 2h (t = 2h). Độ dài ngày làm việc vẫn là 8 giờ.\n' +
            '• Khi đó, thời gian lao động thặng dư tự động tăng từ 4h lên 6h (t′ = 6h).\n' +
            '  => Tỷ suất giá trị thặng dư mới: m′ = (6 / 2) × 100% = 300%!\n' +
            'Tỷ suất bóc lột tăng vọt từ 100% lên 300% mà không cần kéo dài thêm dù chỉ một phút của ngày làm việc.'
        },
        {
          type: 'explanation',
          title: 'Cơ chế rút ngắn thời gian lao động tất yếu',
          content: 'Để rút ngắn thời gian lao động tất yếu (t), phải giảm giá trị sức lao động. Muốn giảm giá trị sức lao động, phải giảm giá trị của các tư liệu sinh hoạt cần thiết để nuôi sống công nhân. Muốn vậy, phải tăng năng suất lao động trong các ngành sản xuất tư liệu sinh hoạt và các ngành sản xuất tư liệu sản xuất phục vụ cho các ngành đó. Như vậy, sản xuất giá trị thặng dư tương đối đòi hỏi phải có sự tiến bộ kỹ thuật trên quy mô toàn xã hội.'
        },
        {
          type: 'proposition',
          title: '3. Giá trị thặng dư siêu ngạch (Extraordinary Surplus Value)',
          content: 'Giá trị thặng dư siêu ngạch là phần giá trị thặng dư dôi ra ngoài giá trị thặng dư thông thường, thu được do từng doanh nghiệp cá biệt áp dụng kỹ thuật tiên tiến, nâng cao năng suất lao động cá biệt cao hơn năng suất lao động xã hội, làm cho giá trị cá biệt của hàng hóa thấp hơn giá trị xã hội nhưng vẫn bán theo giá trị xã hội.'
        },
        {
          type: 'explanation',
          title: 'Bản chất và động lực của giá trị thặng dư siêu ngạch',
          content: '• Về thực chất: Giá trị thặng dư siêu ngạch là một hình thái biến tướng của giá trị thặng dư tương đối, vì nó cũng dựa trên việc tăng năng suất lao động.\n' +
            '• Tính chất tạm thời: Đối với từng nhà tư bản cá biệt, giá trị thặng dư siêu ngạch chỉ tồn tại tạm thời. Khi các đối thủ cạnh tranh cũng áp dụng công nghệ mới tương tự, giá trị xã hội của hàng hóa sẽ giảm xuống bằng giá trị cá biệt, giá trị thặng dư siêu ngạch ở xí nghiệp đó sẽ biến mất.\n' +
            '• Động lực xã hội: Khát vọng săn lùng giá trị thặng dư siêu ngạch là động lực mạnh mẽ nhất thúc đẩy các nhà tư bản không ngừng cải tiến kỹ thuật, hợp lý hóa sản xuất, làm cho năng suất lao động xã hội tăng lên, và kết quả là biến giá trị thặng dư siêu ngạch thành giá trị thặng dư tương đối của toàn xã hội.'
        },
        {
          type: 'table',
          title: 'Bảng so sánh tổng hợp: Ba phương pháp sản xuất giá trị thặng dư',
          tableData: {
            headers: ["Tiêu chí", "Giá trị thặng dư tuyệt đối", "Giá trị thặng dư tương đối", "Giá trị thặng dư siêu ngạch"],
            rows: [
              ["Khái niệm cốt lõi", "Thu được do kéo dài ngày lao động vượt quá thời gian tất yếu.", "Thu được do rút ngắn thời gian tất yếu nhờ tăng năng suất lao động xã hội.", "Thu được do giá trị cá biệt thấp hơn giá trị xã hội nhờ kỹ thuật vượt trội."],
              ["Độ dài ngày lao động", "Kéo dài ngày lao động (tổng độ dài tăng lên).", "Giữ nguyên độ dài ngày lao động (tổng độ dài không đổi).", "Không phụ thuộc vào độ dài ngày lao động."],
              ["Thời gian lao động tất yếu (t)", "Không thay đổi (giữ nguyên).", "Bị rút ngắn lại nhờ năng suất lao động xã hội tăng.", "Rút ngắn ở cấp độ cá biệt của doanh nghiệp đi đầu."],
              ["Biện pháp chủ yếu", "Cưỡng bức kéo dài giờ làm việc, tăng ca, tăng cường độ lao động.", "Áp dụng kỹ thuật công nghệ mới trên toàn bộ nền kinh tế xã hội.", "Cải tiến kỹ thuật cá biệt, bí mật công nghệ, bằng phát minh sáng chế."],
              ["Phạm vi tồn tại", "Phổ biến trong giai đoạn đầu (hiệp tác giản đơn, công trường thủ công).", "Phổ biến trong giai đoạn cơ khí hóa, tự động hóa cao.", "Tồn tại ở các doanh nghiệp tiên phong, tạm thời nhưng liên tục tái sinh."],
              ["Ý nghĩa đối với xã hội", "Làm suy kiệt thể lực người lao động, gây xung đột giai cấp gay gắt.", "Thúc đẩy lực lượng sản xuất xã hội phát triển vượt bậc.", "Là động lực trực tiếp và mạnh mẽ nhất kích thích đổi mới sáng tạo công nghệ."]
            ]
          }
        }
      ]
    }
  },
  {
    id: "3.2",
    number: "3.2",
    title: "Liên hệ Cách mạng công nghiệp 4.0 và Thực tiễn Việt Nam",
    subtitle: "Sức sống thời đại của lý luận Mác trước làn sóng AI và nền kinh tế thị trường định hướng XHCN",
    estimatedMinutes: 40,
    objectives: [
      "Giải thích luận điểm của C. Mác: Tại sao AI và Robot không trực tiếp tạo ra giá trị mới?",
      "Nhận diện các hình thái bóc lột mới trong nền kinh tế số và quản lý bằng thuật toán.",
      "Làm rõ tính tất yếu khách quan của quan hệ bóc lột và giá trị thặng dư trong nền kinh tế thị trường định hướng XHCN ở Việt Nam.",
      "Hiểu rõ vai trò điều tiết của Nhà nước và Công đoàn trong việc bảo vệ quyền lợi người lao động."
    ],
    summary: "AI và robot là tư bản bất biến (c), chỉ chuyển dịch giá trị chứ không tạo ra giá trị mới. Việt Nam thừa nhận sự tồn tại khách quan của giá trị thặng dư ở các thành phần kinh tế tư nhân và FDI để phát triển lực lượng sản xuất, đồng thời tăng cường sự quản lý của Nhà nước để bảo đảm công bằng xã hội.",
    content: {
      lead: "Lý luận về giá trị thặng dư của C. Mác được xây dựng trong bối cảnh cuộc cách mạng công nghiệp lần thứ nhất và thứ hai (máy hơi nước, cơ khí hóa). Vậy trong thời đại Cách mạng công nghiệp 4.0 với trí tuệ nhân tạo (AI), robot tự hành, kinh tế nền tảng (gig economy), lý thuyết này có còn nguyên giá trị khoa học không?",
      blocks: [
        {
          type: 'proposition',
          title: '1. AI và Robot có tạo ra giá trị mới và giá trị thặng dư không?',
          content: 'Nhiều nhà kinh tế tư sản hiện đại cho rằng trong các nhà máy tự động hóa hoàn toàn (' + "'đèn tắt' - lights-out factory" + '), robot và AI đã thay thế hoàn toàn con người nên robot chính là chủ thể tạo ra giá trị mới và thặng dư. Tuy nhiên, đứng vững trên lập trường lý luận của C. Mác, câu trả lời dứt khoát là: KHÔNG.'
        },
        {
          type: 'explanation',
          title: 'Luận cứ khoa học khẳng định bản chất của Robot và AI',
          content: '• Bản chất của Robot và AI: Thuộc về TƯ BẢN BẤT BIẾN (c). Dù thông minh và tinh vi đến đâu, AI và robot chỉ là công cụ lao động kết tinh từ hao phí lao động trong quá khứ của con người.\n' +
            '• Cơ chế chuyển dịch giá trị: Trong quá trình vận hành, robot hao mòn dần và chỉ chuyển dịch từng phần giá trị có sẵn của chính nó vào sản phẩm mới thông qua lao động cụ thể của con người điều khiển hoặc bảo dưỡng nó. Nó không thể tự sinh ra một lượng giá trị lớn hơn giá trị của bản thân nó.\n' +
            '• Nguồn gốc thực sự của giá trị trong kỷ nguyên 4.0: Vẫn là LAO ĐỘNG SỐNG CỦA CON NGƯỜI, nhưng được chuyển hóa thành lao động trí tuệ phức tạp, hàm lượng tri thức cao — của các kỹ sư lập trình, chuyên gia thuật toán, kiến trúc sư hệ thống, và đội ngũ công nhân kỹ thuật kiểm soát dây chuyền.'
        },
        {
          type: 'proposition',
          title: '2. Các biến tướng mới của sự bóc lột trong nền kinh tế số',
          content: 'Trong nền kinh tế 4.0, sự bóc lột không biến mất mà khoác lên mình những hình thái vô cùng tinh vi:'
        },
        {
          type: 'table',
          title: 'Bảng phân tích: Các hình thái bóc lột mới trong kỷ nguyên số',
          tableData: {
            headers: ["Hình thái bóc lột", "Đặc điểm nhận diện", "Bản chất kinh tế theo Mác"],
            rows: [
              ["Quản lý bằng thuật toán (Algorithmic Management)", "Thuật toán định tuyến, bấm giờ giao hàng, đánh giá sao, chấm điểm hiệu suất tự động.", "Gia tăng cường độ lao động tới hạn, biến thuật toán thành công cụ giám sát vô hình."],
              ["Nền kinh tế nền tảng (Gig Economy)", "Tài xế công nghệ, freelancer được gọi hoa mỹ là 'đối tác độc lập' chứ không phải nhân viên.", "Nhà tư bản nền tảng trốn tránh nghĩa vụ bảo hiểm xã hội, đẩy toàn bộ rủi ro và tư liệu sản xuất (xe cộ, điện thoại) cho người lao động."],
              ["Lao động vô hình 24/7 (Invisible Labor)", "Làm việc từ xa (Work From Home), trả lời email, tin nhắn công việc ngoài giờ hành chính.", "Kéo dài ngày lao động tuyệt đối một cách vô hình, xóa nhòa ranh giới giữa thời gian làm việc và thời gian nghỉ ngơi."],
              ["Bóc lột dữ liệu người dùng (Digital Labor)", "Người dùng lướt mạng xã hội, tương tác nội dung, đóng góp dữ liệu miễn phí để huấn luyện mô hình AI.", "Tập đoàn công nghệ chiếm đoạt dữ liệu như nguồn tài nguyên không bồi hoàn để tạo ra siêu lợi nhuận."]
            ]
          }
        },
        {
          type: 'proposition',
          title: '3. Thực tiễn vận dụng tại Việt Nam trong thời kỳ quá độ lên CNXH',
          content: 'Trong nền kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam hiện nay, việc nhận thức và vận dụng quy luật giá trị thặng dư có ý nghĩa thực tiễn đặc biệt quan trọng:'
        },
        {
          type: 'explanation',
          title: 'Thừa nhận sự tồn tại khách quan của Giá trị thặng dư ở Việt Nam',
          content: '• Tính tất yếu khách quan: Trong thời kỳ quá độ lên chủ nghĩa xã hội, nền kinh tế Việt Nam còn nhiều thành phần kinh tế (kinh tế nhà nước, kinh tế tập thể, kinh tế tư nhân, kinh tế có vốn đầu tư nước ngoài FDI). Do đó, sự tồn tại của quan hệ bóc lột lao động làm thuê và sự sản xuất giá trị thặng dư trong khu vực tư nhân và FDI là một tất yếu khách quan.\n\n' +
            '• Mặt tích cực to lớn: Sự tìm kiếm giá trị thặng dư thúc đẩy các doanh nghiệp tư nhân và FDI đầu tư vốn, chuyển giao công nghệ, mở rộng sản xuất, tạo hàng triệu việc làm, tăng năng suất lao động xã hội, nâng cao năng lực cạnh tranh quốc gia và đóng góp lớn cho ngân sách nhà nước.'
        },
        {
          type: 'remember',
          title: 'Vai trò quản lý của Nhà nước pháp quyền XHCN Việt Nam',
          content: 'Để vừa giải phóng tối đa sức sản xuất, vừa bảo đảm định hướng XHCN, Đảng và Nhà nước ta thực hiện nguyên tắc quản lý đồng bộ:\n' +
            '1. Khung khổ pháp luật: Ban hành Bộ luật Lao động, quy định mức lương tối thiểu vùng, bảo hiểm xã hội, bảo hiểm y tế bắt buộc, thời giờ làm việc tối đa (không quá 48 giờ/tuần, hướng tới 40 giờ/tuần).\n' +
            '2. Vai trò của tổ chức Công đoàn: Đại diện bảo vệ quyền và lợi ích hợp pháp, chính đáng của người lao động; thương lượng thỏa ước lao động tập thể.\n' +
            '3. Phân phối và an sinh xã hội: Điều tiết thu nhập qua thuế thu nhập doanh nghiệp và cá nhân, đầu tư cho y tế, giáo dục, hạ tầng công cộng, hỗ trợ người yếu thế.\n' +
            '4. Mục tiêu tối thượng: Từng bước hoàn thiện quan hệ sản xuất tiến bộ, hiện thực hóa khát vọng: "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh".'
        }
      ]
    }
  },
  {
    id: "3.3",
    number: "3.3",
    title: "Kết luận chương 3",
    subtitle: "Quy luật kinh tế tuyệt đối của chủ nghĩa tư bản và giá trị thời đại",
    estimatedMinutes: 15,
    objectives: [
      "Tổng kết quy luật giá trị thặng dư là quy luật kinh tế tuyệt đối của CNTB.",
      "Khẳng định giá trị thời đại và sức sống trường tồn của học thuyết C. Mác."
    ],
    summary: "Quy luật giá trị thặng dư quyết định sự phát sinh, phát triển và xu hướng diệt vong của chủ nghĩa tư bản; đồng thời là kim chỉ nam để nhận thức sâu sắc các biến động kinh tế đương đại.",
    content: {
      lead: "Toàn bộ lý luận trong chương 3 cho thấy học thuyết giá trị thặng dư không phải là giáo điều trừu tượng, mà là công cụ giải phẫu khoa học sắc bén nhất để thấu hiểu bản chất của nền kinh tế thị trường tư bản chủ nghĩa.",
      blocks: [
        {
          type: 'proposition',
          title: 'Quy luật kinh tế tuyệt đối của chủ nghĩa tư bản',
          content: 'C. Mác khẳng định: "Sản xuất ra giá trị thặng dư hay là làm giàu, đó là quy luật tuyệt đối của phương thức sản xuất này". Quy luật giá trị thặng dư chi phối mọi mặt của đời sống kinh tế tư bản, quyết định từ việc tổ chức phân công lao động, cải tiến kỹ thuật, tích lũy mở rộng sản xuất cho đến các chu kỳ khủng hoảng kinh tế.'
        },
        {
          type: 'remember',
          title: 'Ba bài học cốt lõi cần ghi nhớ',
          content: '1. Nguồn gốc duy nhất của giá trị mới và giá trị thặng dư là lao động sống của con người, chứ không phải máy móc, lưu thông hay tiền tệ.\n' +
            '2. Bản chất của giá trị thặng dư là quan hệ bóc lột kinh tế, được che giấu khéo léo qua các hình thái tiền công và lợi nhuận.\n' +
            '3. Dù nền kinh tế chuyển sang tự động hóa 4.0 hay kinh tế tri thức, quy luật giá trị thặng dư vẫn vận động mạnh mẽ với những hình thái biến tướng tinh vi hơn, đòi hỏi sự điều tiết chủ động của Nhà nước pháp quyền XHCN vì con người và tiến bộ xã hội.'
        }
      ]
    }
  }
];
