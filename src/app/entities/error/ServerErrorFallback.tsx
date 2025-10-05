interface ServerErrorFallbackProps {
  status: 401 | 403 | 404 | 500 | 502 | 503 | 504 | 0 | number;
}

const ServerErrorFallback = ({ status }: ServerErrorFallbackProps) => {
  switch (status) {
    case 401:
      return <div>401 - 인증되지 않음. 로그인 해주세요.</div>;
    case 403:
      return <div>403 - 접근 금지. 권한이 없습니다.</div>;
    case 404:
      return <div>404 - 페이지를 찾을 수 없음.</div>;
    case 500:
      return <div>500 - 서버 오류. 잠시 후 다시 시도해주세요.</div>;
    case 502:
      return <div>502 - 잘못된 게이트웨이. 잠시 후 다시 시도해주세요.</div>;
    case 503:
      return <div>503 - 서비스 이용 불가. 잠시 후 다시 시도해주세요.</div>;
    case 504:
      return <div>504 - 게이트웨이 시간 초과. 잠시 후 다시 시도해주세요.</div>;
    default:
      return <div>{status} - 알 수 없는 오류가 발생했습니다.</div>;
  }
};

export default ServerErrorFallback;
