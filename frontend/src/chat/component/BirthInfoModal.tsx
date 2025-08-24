import { useState } from "react";
import {
  Body,
  CloseBtn,
  Dialog,
  Footer,
  Header,
  Input,
  Overlay,
  PrimaryBtn,
  Radio,
  Row,
  Title,
} from "./BirthInfoModal.style";

export interface BirthInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export const BirthInfoModal = ({ open, onClose }: BirthInfoModalProps) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"female" | "male">("female");
  const [calendar, setCalendar] = useState<"solar" | "lunar">("solar");
  const [birth, setBirth] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>한양사주 만세력</Title>
          <CloseBtn aria-label="close" onClick={onClose}>
            ×
          </CloseBtn>
        </Header>
        <Body>
          <div>이름</div>
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>성별</div>
          <Row>
            <Radio>
              <input
                type="radio"
                name="gender"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              여자
            </Radio>
            <Radio>
              <input
                type="radio"
                name="gender"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              남자
            </Radio>
          </Row>

          <div>양/음력</div>
          <Row>
            <Radio>
              <input
                type="radio"
                name="calendar"
                checked={calendar === "solar"}
                onChange={() => setCalendar("solar")}
              />
              양력
            </Radio>
            <Radio>
              <input
                type="radio"
                name="calendar"
                checked={calendar === "lunar"}
                onChange={() => setCalendar("lunar")}
              />
              음력
            </Radio>
          </Row>

          <div>생년월일시</div>
          <Input
            placeholder="생년월일시 (예: 2025 0818 0500)"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <Row>
            <label>
              <input
                type="checkbox"
                checked={timeUnknown}
                onChange={(e) => setTimeUnknown(e.target.checked)}
              />
              시간 모름
            </label>
          </Row>
        </Body>
        <Footer>
          <PrimaryBtn onClick={onClose}>저장하기</PrimaryBtn>
        </Footer>
      </Dialog>
    </Overlay>
  );
};
