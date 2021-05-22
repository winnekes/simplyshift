import { FormControl, FormLabel, Switch, Text, VStack } from "@chakra-ui/react";

type Props = {
  isEditingCalendar: boolean;
  onChange: () => void;
};
export function EditModeSettings({ isEditingCalendar, onChange }: Props) {
  return (
    <VStack align="flex-end">
      <FormControl display="flex" alignItems="center" justifyContent="flex-end">
        <FormLabel htmlFor="email-alerts" mb="0">
          Editing mode is {isEditingCalendar ? "on" : "off"}
        </FormLabel>
        <Switch
          id="email-alerts"
          colorScheme="pink"
          isChecked={isEditingCalendar}
          onChange={onChange}
        />
      </FormControl>
      {isEditingCalendar ? (
        <Text fontSize="xs" color="pink">
          <strong>Note</strong>: changes are automatically saved.
        </Text>
      ) : (
        <Text fontSize="xs" color="grey">
          ‎
        </Text>
      )}
    </VStack>
  );
}
