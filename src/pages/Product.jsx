import { useParams } from "react-router-dom";
import Container from "../components/common/Container";

function Product() {
  const { slug } = useParams();

  return (
    <Container className="py-12">Product {slug ? `: ${slug}` : ""}</Container>
  );
}

export default Product;
