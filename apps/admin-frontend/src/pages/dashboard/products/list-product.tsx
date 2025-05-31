import React from "react";
import { Table, message, Input, Button, Select, Row, Col, Modal } from "antd";
import {
  useProducts,
  useProductByEan,
  useProductsByFlag,
  useProductsByCategory,
} from "../../../hooks/useProduct";
// import type { Product } from "../../../lib/entities";
import type { Product } from "../../../lib/entities";
import { useNavigate } from "react-router-dom";
import { useFlags } from "../../../hooks/useFlag";
import { useCategories } from "../../../hooks/useCategory";
import CreateProductForm from "./create-product-form";

const ProductsList: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const navigate = useNavigate();

  const [createVisible, setCreateVisible] = React.useState(false);
  const [ean, setEan] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [selectedFlag, setSelectedFlag] = React.useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = React.useState<
    number | undefined
  >();

  // Fetch filters data
  const { data: flags = [], isLoading: flagsLoading } = useFlags();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  // Product by EAN
  const {
    data: foundProduct,
    isLoading: isSearching,
    error: searchError,
  } = useProductByEan(search);
  // Products by flag/category
  const { data: productsByFlag, isLoading: loadingFlag } = useProductsByFlag(
    selectedFlag!
  );
  const { data: productsByCategory, isLoading: loadingCategory } =
    useProductsByCategory(selectedCategory!);

  React.useEffect(() => {
    if (error) {
      message.error("Erreur lors de la récupération des produits");
    }
    if (searchError) {
      message.error("Aucun produit trouvé avec cet EAN");
    }
  }, [error, searchError]);

  // Columns
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

  // Table data logic
  let tableData: Product[] = products || [];
  if (search && foundProduct) {
    tableData = [foundProduct as Product];
  } else if (selectedFlag && productsByFlag) {
    tableData = productsByFlag as Product[];
  } else if (selectedCategory && productsByCategory) {
    tableData = productsByCategory as Product[];
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
            placeholder="Rechercher par EAN (API)"
            allowClear
            style={{ width: 230 }}
            value={ean}
            onChange={(e) => setEan(e.target.value)}
            enterButton="Chercher"
            loading={isSearching}
            onSearch={(val) => setSearch(val.trim())}
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
              setEan("");
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
      <Table<Product>
        loading={isLoading || isSearching || loadingFlag || loadingCategory}
        dataSource={tableData}
        rowKey="uid"
        columns={columns}
        onRow={(record) => ({
          onClick: () => navigate(`/dashboard/products/${record.uid}`),
          style: { cursor: "pointer" },
        })}
      />
    </>
    
  );
};

export default ProductsList;
