import { diagramInfo, type DiagramKind } from '@/lib/navigation';

type Box = { text: string; x: number; y: number };
type Line = { x: number; y: number; width: number; height: number };
type Arrow = { x: number; y: number; direction: 'down' | 'right' };
type Label = { text: string; x: number; y: number };
const left = (text: string, row: number): Box => ({ text, x: 28, y: 36 + row * 88 });
const right = (text: string, row: number): Box => ({ text, x: 382, y: 36 + row * 88 });
const down = (row: number, x = 59): Line => ({ x, y: 81 + row * 88, width: 2, height: 43 });
const downArrow = (row: number, x = 54): Arrow => ({ x, y: 107 + row * 88, direction: 'down' });
const across = (row: number): Line => ({ x: 258, y: 58 + row * 88, width: 124, height: 2 });
const rightArrow = (row: number): Arrow => ({ x: 372, y: 46 + row * 88, direction: 'right' });
const labelRight = (text: string, row: number): Label => ({ text, x: 267, y: 39 + row * 88 });
const labelDown = (text: string, row: number): Label => ({ text, x: 70, y: 90 + row * 88 });

const diagrams: Record<DiagramKind, { height: number; boxes: Box[]; lines: Line[]; arrows: Arrow[]; labels: Label[]; steps: { text: string; branch?: string }[] }> = {
  'pr-workflow': {
    height: 530,
    boxes: [left('Review PR', 0), left('Duyệt phạm vi?', 1), right('Đóng đề xuất', 1), left('Tạo patch và test', 2), left('Test đạt?', 3), right('Còn lượt: sửa lại', 3), left('Xác nhận ghi Git?', 4), left('Tạo hoặc cập nhật PR', 5), right('Giữ bản nháp', 4)],
    lines: [...[0, 1, 2, 3, 4].map(row => down(row)), ...[1, 3, 4].map(across), { x: 506, y: 286, width: 2, height: 58 }, { x: 152, y: 286, width: 354, height: 2 }, { x: 152, y: 203, width: 2, height: 83 }],
    arrows: [...[0, 1, 2, 3, 4].map(row => downArrow(row)), ...[1, 3, 4].map(rightArrow), { x: 147, y: 195, direction: 'down' }],
    labels: [labelRight('Từ chối', 1), labelDown('Duyệt', 1), labelRight('Chưa đạt', 3), labelDown('Đạt', 3), labelDown('Đồng ý', 4), labelRight('Chưa duyệt', 4)],
    steps: [{ text: 'Review PR' }, { text: 'Duyệt phạm vi?', branch: 'Từ chối → Đóng đề xuất' }, { text: 'Tạo patch và test' }, { text: 'Test đạt?', branch: 'Chưa đạt → Sửa lại nếu còn lượt' }, { text: 'Xác nhận ghi Git?', branch: 'Chưa duyệt → Giữ bản nháp' }, { text: 'Tạo hoặc cập nhật PR' }],
  },
  architecture: {
    height: 354,
    boxes: [left('Portal Shell', 0), left('API .NET', 1), right('Webhook Git', 0), right('Điều phối job', 1), left('Worker AI', 2), right('Runner CI / Local', 2), left('PostgreSQL', 3), right('Kho artifact', 3)],
    lines: [down(0), down(0, 413), across(1), { x: 506, y: 168, width: 2, height: 12 }, { x: 152, y: 180, width: 354, height: 2 }, { x: 152, y: 180, width: 2, height: 23 }, down(1, 413), { x: 59, y: 169, width: 2, height: 131 }, down(2, 413)],
    arrows: [downArrow(0), downArrow(0, 408), rightArrow(1), { x: 147, y: 195, direction: 'down' }, downArrow(1, 408), downArrow(2), downArrow(2, 408)],
    labels: [],
    steps: [{ text: 'Portal Shell → API .NET' }, { text: 'Webhook Git → Điều phối job' }, { text: 'API .NET → Điều phối job', branch: 'API .NET → PostgreSQL' }, { text: 'Điều phối job → Worker AI' }, { text: 'Điều phối job → Runner CI / Local' }, { text: 'Runner CI / Local → Kho artifact' }],
  },
  'ai-permissions': {
    height: 442,
    boxes: [left('Yêu cầu review', 0), left('Kiểm tra quyền tenant', 1), right('Quyền không hợp lệ', 1), left('Lọc nội dung nhạy cảm', 2), left('Provider được phép?', 3), right('Dừng và ghi audit', 3), left('Gọi LLM đã chọn', 4)],
    lines: [...[0, 1, 2, 3].map(row => down(row)), across(1), across(3)],
    arrows: [...[0, 1, 2, 3].map(row => downArrow(row)), rightArrow(1), rightArrow(3)],
    labels: [labelRight('Từ chối', 1), labelDown('Cho phép', 1), labelRight('Không', 3), labelDown('Có', 3)],
    steps: [{ text: 'Yêu cầu review' }, { text: 'Kiểm tra quyền tenant', branch: 'Từ chối → Quyền không hợp lệ' }, { text: 'Lọc nội dung nhạy cảm' }, { text: 'Provider được phép?', branch: 'Không → Dừng và ghi audit' }, { text: 'Gọi LLM đã chọn' }],
  },
};

export function Diagram({ kind }: { kind: DiagramKind }) {
  const diagram = diagrams[kind];
  return <section className="diagram-page" aria-label={diagramInfo[kind].title}>
    <p className="diagram-eyebrow">PR QUALITY&nbsp; / &nbsp;SƠ ĐỒ</p>
    <h1>{diagramInfo[kind].title}</h1><p className="diagram-description">{diagramInfo[kind].description}</p>
    <div className="diagram-desktop" style={{ height: diagram.height }} aria-hidden="true">
      {diagram.lines.map((line, i) => <span key={`line-${i}`} className="diagram-line" style={{ left: line.x, top: line.y, width: line.width, height: line.height }} />)}
      {diagram.arrows.map((arrow, i) => <span key={`arrow-${i}`} className={`diagram-arrow ${arrow.direction}`} style={{ left: arrow.x, top: arrow.y }}>{arrow.direction === 'down' ? '⌄' : '›'}</span>)}
      {diagram.labels.map((label, i) => <span key={`label-${i}`} className="diagram-label" style={{ left: label.x, top: label.y }}>{label.text}</span>)}
      {diagram.boxes.map(box => <span key={box.text} className="diagram-box" style={{ left: box.x, top: box.y }}>{box.text}</span>)}
    </div>
    <ol className="diagram-mobile">{diagram.steps.map(step => <li key={step.text}><div><strong>{step.text}</strong>{step.branch && <span>{step.branch}</span>}</div></li>)}</ol>
    <ol className="sr-only desktop-diagram-description">{diagram.steps.map(step => <li key={step.text}>{step.text}{step.branch ? `. ${step.branch}` : ''}</li>)}</ol>
  </section>;
}
