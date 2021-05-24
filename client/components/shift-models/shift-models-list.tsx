import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
import { ShiftModel } from "../../types";
import { AddModelModal } from "./add-model-modal";
import { ConfirmDeleteModel } from "./confirm-delete-model";
import { EditModelModal } from "./edit-model-modal";

type Props = {
  shiftModels: ShiftModel[];
  selectedModelId: number;
  setSelectedModelId: Dispatch<SetStateAction<number>>;
};

export const ShiftModelsList = ({
  shiftModels,
  selectedModelId,
  setSelectedModelId,
}: Props) => {
  const [showAddModelModal, setShowAddModelModal] = useState(false);
  const [selectedModelForEditing, setSelectedModelForEditing] =
    useState<ShiftModel | null>(null);
  const [selectedModelForDeleting, setSelectedModelForDeleting] =
    useState<ShiftModel | null>(null);

  const selectModelHandler = (id: number) => {
    if (selectedModelId === id) {
      return setSelectedModelId(null);
    }
    return setSelectedModelId(id);
  };

  return (
    <>
      <Divider my={5} />
      <Flex wrap="wrap" align="center">
        {shiftModels.map((model) => {
          const isActiveModel = selectedModelId === model.id;
          return (
            <HStack key={model.id}>
              <Tag
                mr={1}
                mt={1}
                border={`1px solid ${model.color}`}
                bg={isActiveModel && model.color}
                color={!isActiveModel && model.color}
                boxShadow="none"
                borderRadius="20px"
                cursor="pointer"
                onClick={() => selectModelHandler(model.id)}
                variant={isActiveModel ? "solid" : "outline"}
              >
                <TagLabel mr={5}>{model.name}</TagLabel>
                <Popover gutter={12} placement="top" isLazy>
                  <PopoverTrigger>
                    <TagRightIcon boxSize="12px" as={ViewIcon} />
                  </PopoverTrigger>
                  <PopoverContent maxWidth="250px">
                    <PopoverArrow />
                    <PopoverHeader border="0" fontWeight="bold">
                      <Flex alignItems="center">
                        {model.name}
                        <Spacer />
                        <Button
                          variant="ghost"
                          padding="1"
                          size="sm"
                          onClick={() => setSelectedModelForDeleting(model)}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          padding="1"
                          size="sm"
                          onClick={() => setSelectedModelForEditing(model)}
                        >
                          <EditIcon />
                        </Button>
                      </Flex>
                    </PopoverHeader>
                    <PopoverBody>
                      Start time:{" "}
                      {moment(model.startsAt, "HH:mm").format("HH:mm")} <br />
                      Ends at: {moment(model.endsAt, "HH:mm").format("HH:mm")}
                      <br />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Tag>
            </HStack>
          );
        })}

        <Tag
          color="brand01.100"
          boxShadow="none"
          borderRadius="20px"
          cursor="pointer"
          mr={1}
          mt={1}
          variant="ghost"
          onClick={() => setShowAddModelModal(true)}
        >
          <TagLeftIcon boxSize="12px" as={AddIcon} />{" "}
          <TagLabel>create a new model</TagLabel>
        </Tag>
      </Flex>
      <Divider my={5} />
      <Text fontSize="sm" color="grey">
        <strong>How to</strong>: select a model and click (long press for
        mobile) on a day in the calendar to add a shift or to update an existing
        shift.
      </Text>
      <br />
      {selectedModelForEditing && (
        <EditModelModal
          model={selectedModelForEditing}
          onClose={() => setSelectedModelForEditing(null)}
        />
      )}
      {selectedModelForDeleting && (
        <ConfirmDeleteModel
          shiftModel={selectedModelForDeleting}
          onClose={() => setSelectedModelForDeleting(null)}
        />
      )}
      {showAddModelModal && (
        <AddModelModal onClose={() => setShowAddModelModal(false)} />
      )}
    </>
  );
};
