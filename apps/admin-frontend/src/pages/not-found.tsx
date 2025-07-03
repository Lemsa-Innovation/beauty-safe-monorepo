import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Désolé, la page que vous cherchez n'existe pas."
      extra={
        <Button type="primary" onClick={() => navigate("/dashboard/categories")}>
          Retour à l'accueil
        </Button>
      }
    />
  );
};

export default NotFound;
