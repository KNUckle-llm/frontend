export const POST = async (req: Request) => {
  const { inputText } = await req.json();

  return Response.json({
    title: inputText,
    content: `안녕하세요. ${inputText}에 대해서 설명해드리겠습니다. ${inputText}은........`,
  });
};
