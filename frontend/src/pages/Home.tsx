import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { ProductTypes } from "../types";
import ProductCard from "../components/ProductCard";
import { Container, SimpleGrid } from "@chakra-ui/react";

export default function Home() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, [fetchProducts]);
  return (
    <Container maxW={"container.lg"}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 5, lg: 8 }}
        py={{ base: 5, lg: 8 }}
      >
        {products.map((product: ProductTypes) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </SimpleGrid>
    </Container>
  );
}
