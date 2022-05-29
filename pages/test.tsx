import { Welcome } from "../components/Welcome/Welcome";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import { TypingInput } from "../components/TypingInput/TypingInput";
import { Letter } from "../components/TypingOutput/Letter/Letter";
import { Center } from "@mantine/core";

export default function TestPage() {
  return (
    <PageWrapper>
      <Welcome />
      <ColorSchemeToggle />
      <Center>
        <TypingInput />
        <Letter expected={"a"} actual={"a"} active wordPassed={false} />
        <Letter expected={"b"} actual={"a"} active wordPassed={false} />
        <Letter expected={"a"} actual={""} active={false} wordPassed={false} />
        <Letter expected={"a"} actual={""} active wordPassed />
        <Letter expected={""} actual={"d"} active wordPassed />
      </Center>
    </PageWrapper>
  );
}
