import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col, Typography, Spin, Empty } from 'antd';
import { useSubCategories } from '../../../hooks/useSubCategory';

const { Title } = Typography;

const SubCategoriesPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const { data: subCategories, isLoading } = useSubCategories();

  const filtered = subCategories?.filter(
    (sub) => sub.category?.id?.toString() === categoryId
  );

  const handleClick = (subCategoryId: number) => {
    const selected = filtered?.find((sub) => sub.id === subCategoryId);
    if (selected?.subsubcategories?.length) {
      navigate(`/dashboard/subcategories/${subCategoryId}`);
    } else {
      navigate(`/dashboard/products?subCategoryId=${subCategoryId}`);
    }
  };

  if (isLoading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  if (!filtered?.length) {
    return <Empty description="Aucune sous-catégorie trouvée" style={{ marginTop: 50 }} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={3} style={{ marginBottom: '2rem' }}>Sous-catégories</Title>
      <Row gutter={[24, 24]}>
        {filtered.map((sub) => (
          <Col key={sub.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => handleClick(sub.id)}
              style={{ textAlign: 'center', borderRadius: 12 }}
            >
              <Title level={5}>{sub.name}</Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SubCategoriesPage;
