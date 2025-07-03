import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={<span role="img" aria-label="construction" style={{ fontSize: 50 }}>🚧</span>}
      title="Bientôt disponible"
      subTitle="Cette page sera disponible prochainement. Merci de votre patience."
      extra={
        <Button type="primary" onClick={() => navigate("/dashboard/categories")}>
          Retour à l'accueil
        </Button>
      }
    />
  );
};

export default ComingSoon;
