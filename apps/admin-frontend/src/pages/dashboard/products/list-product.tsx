import React from "react";
import {
  Table,
  message,
  Input,
  Button,
  Select,
  Row,
  Col,
  Modal,
  Spin,
} from "antd";
import {
  
  useProductByEan,
  useProductsByFlag,
  useProductsByCategory,
  useProducts,
} from "../../../hooks/useProduct";
import type { Product } from "../../../lib/entities";
import { useNavigate } from "react-router-dom";
import { useFlags } from "../../../hooks/useFlag";
import { useCategories } from "../../../hooks/useCategory";
import CreateProductForm from "./create-product-form";

const ProductsList: React.FC = () => {
  const navigate = useNavigate();

  const [createVisible, setCreateVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedFlag, setSelectedFlag] = React.useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = React.useState<number | undefined>();
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);

  const { data: flags = [], isLoading: flagsLoading } = useFlags();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const {
    data: paginatedData,
    isLoading,
  } = useProducts(page, limit);

  const { data: foundProduct, isLoading: isSearching, error: searchError } = useProductByEan(search);

  const { data: productsByFlag, isLoading: loadingFlag } = useProductsByFlag(selectedFlag!);
  const { data: productsByCategory, isLoading: loadingCategory } = useProductsByCategory(selectedCategory!);

  React.useEffect(() => {
    if (searchError) {
      message.error("Aucun produit trouvé avec cet EAN");
    }
  }, [searchError]);

  const columns = [
    { title: "ID", dataIndex: "uid" },
    { title: "Nom", dataIndex: "name" },
    {
      title: "Marque",
      dataIndex: "brand",
      render: (brand: { name: any }) => brand?.name || "—",
    },
    { title: "EAN", dataIndex: "ean" },
    { title: "Type", dataIndex: "type" },
    {
      title: "Catégorie",
      dataIndex: "category",
      render: (category: { name: any }) => category?.name || "—",
    },
    {
      title: "Sous-catégorie",
      dataIndex: "subCategory",
      render: (subCategory: { name: any }) => subCategory?.name || "—",
    },
    {
      title: "Sous-sous-catégorie",
      dataIndex: "subSubCategory",
      render: (subSubCategory: { name: any }) => subSubCategory?.name || "—",
    },
    { title: "Score", dataIndex: "validScore" },
    {
      title: "Image",
      dataIndex: "images",
      render: (images: { thumbnail?: string; image?: string }[]) =>
        images && images.length > 0 && images[0].thumbnail ? (
          <img
            src={images[0].thumbnail}
            alt="Produit"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 6,
              boxShadow: "0 1px 4px #eee",
            }}
          />
        ) : (
          <span style={{ color: "#bbb" }}>—</span>
        ),
    },
  ];

  let tableData: Product[] = paginatedData?.data || [];
  let total = paginatedData?.total || 0;

  if (search && foundProduct) {
    tableData = [foundProduct];
    total = 1;
  } else if (selectedFlag && productsByFlag) {
    tableData = productsByFlag;
    total = productsByFlag.length;
  } else if (selectedCategory && productsByCategory) {
    tableData = productsByCategory;
    total = productsByCategory.length;
  }

  return (
    <>
      <Modal
        open={createVisible}
        title="Ajouter un produit"
        onCancel={() => setCreateVisible(false)}
        footer={null}
        destroyOnClose
      >
        <CreateProductForm
          onSuccess={() => {
            setCreateVisible(false);
          }}
        />
      </Modal>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Rechercher par EAN"
            allowClear
            style={{ width: 230 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            enterButton="Chercher"
            loading={isSearching}
            onSearch={(val) => {
              setSearch(val.trim());
              setSelectedCategory(undefined);
              setSelectedFlag(undefined);
            }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Filtrer par catégorie"
            loading={categoriesLoading}
            allowClear
            style={{ width: 180 }}
            value={selectedCategory}
            onChange={(val) => {
              setSelectedCategory(val);
              setSelectedFlag(undefined);
              setSearch("");
            }}
          >
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            placeholder="Filtrer par flag"
            loading={flagsLoading}
            allowClear
            style={{ width: 180 }}
            value={selectedFlag}
            onChange={(val) => {
              setSelectedFlag(val);
              setSelectedCategory(undefined);
              setSearch("");
            }}
          >
            {flags.map((flag) => (
              <Select.Option key={flag.id} value={flag.id}>
                {flag.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setSearch("");
              setSelectedCategory(undefined);
              setSelectedFlag(undefined);
            }}
          >
            Réinitialiser
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => setCreateVisible(true)}
          >
            Ajouter un produit
          </Button>
        </Col>
      </Row>

      <Spin spinning={isLoading || isSearching || loadingFlag || loadingCategory}>
        <Table<Product>
          dataSource={tableData}
          rowKey="uid"
          columns={columns}
          pagination={{
            current: page,
            pageSize: limit,
            total,
            onChange: (newPage) => setPage(newPage),
          }}
          onRow={(record) => ({
            onClick: () => navigate(`/dashboard/products/${record.uid}`),
            style: { cursor: "pointer" },
          })}
        />
      </Spin>
    </>
  );
};

export default ProductsList;
