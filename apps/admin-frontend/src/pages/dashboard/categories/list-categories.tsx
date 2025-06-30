import React from "react";
import { Card, Row, Col, Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategory";

const { Title } = Typography;

// Emoji icons per category name (adjust or localize as needed)
const categoryIcons: Record<string, string> = {
  "Bien-être": "💪",
  "Coiffure": "💇",
  "Diététique": "🍏",
  "Hygiène dentaire": "🪮",
  "Hygiène du corps": "🛁",
  "Manucure et pédicure": "💅",
  "Maquillage": "💄",
  "Parfum": "🌸",
  "Produit solaire": "☀️",
  "Rasage et épilation": "✂️",
  "Santé": "⚕️",
  "Soin du corps et visage": "💆",
  "Soin et hygiène bébé": "👶🏼",
};

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>Catégories</Title>
      <Row gutter={[16, 16]}>
        {categories?.map((category) => (
          <Col key={category.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "12px" }}
              onClick={() => navigate(`/dashboard/products?CategoryId=${category.id}`)}
            >
              <div style={{ fontSize: "36px" }}>
                {categoryIcons[category.name] || "🌟"}
              </div>
              <div style={{ marginTop: 8, fontWeight: 500 }}>{category.name}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoriesPage;
