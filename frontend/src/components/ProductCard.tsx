import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ProductTypes } from "../types";
import { useState } from "react";
import { useProductStore } from "../store/product";


export default function ProductCard({ product }: { product: ProductTypes }) {

  const [updateData, setUpdateData] = useState(product);
  const { deleteProduct, editProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelDelete = async (pid: any) => {
    const result = await deleteProduct(pid);
    if (result.sucess) {
      toast({
        description: result.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: result.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handelUpdate = async (id: any) => {
    const result = await editProduct(id, updateData);
    if (result.sucess) {
      toast({
        description: result.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: result.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose()
  };
  return (
    <div>
      <Card key={product._id}>
        <CardHeader>
          <Image src={product.image} alt={product.name} />
        </CardHeader>
        <CardBody>
          <Text fontSize={"lg"} as={"b"}>
            {product.name}
          </Text>
          <Text fontSize={"lg"}>Price: ${product.price}</Text>
        </CardBody>
        <CardFooter justifyContent={"space-between"} gap={"4"}>
          <Button
            width={"full"}
            bg={"blue.500"}
            color={"white"}
            onClick={() => onOpen()}
          >
            Edit
          </Button>
          <Button
            width={"full"}
            bg={"red.500"}
            color={"white"}
            onClick={() => handelDelete(product._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Modal Card */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder="Product Name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                type="number"
                value={updateData.price}
                onChange={(e) =>
                    setUpdateData({ ...updateData, price: Number(e.target.value) })
                }
              />
              <Input
                placeholder="Product Image"
                value={updateData.image}
                onChange={(e) =>
                  setUpdateData({ ...updateData, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handelUpdate(product._id)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cloce
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
