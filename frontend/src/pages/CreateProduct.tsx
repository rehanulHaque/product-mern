import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useProductStore } from "../store/product";

export default function CreateProduct() {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast()
  const {createProduct} = useProductStore()
  const addProduct = async (data: any) => {
    const result = await createProduct(data);
    toast({
      description: result.message,
      status: result.sucess ? "success" : "error",
      duration: 5000,
      isClosable: true,
    })
  reset();
  };
  return (
    <Container marginTop={"6"}>
      <Text fontSize={"3xl"} as={"b"}>
        Add Product
      </Text>
      <form onSubmit={handleSubmit(addProduct)}>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>
        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input type="text" {...register("price")} />
        </FormControl>
        <FormControl>
          <FormLabel>Product Image</FormLabel>
          <Input type="text" {...register("image")} />
        </FormControl>
        <Button marginTop={"4"} type="submit">Add</Button>
      </form>
    </Container>
  );
}
