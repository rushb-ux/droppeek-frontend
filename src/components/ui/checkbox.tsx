import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { FC } from "react";

interface CheckboxProps {
  children?: React.ReactNode;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ children, isChecked, onChange, isDisabled }) => {
  return (
    <ChakraCheckbox isChecked={isChecked} onChange={onChange} isDisabled={isDisabled}>
      {children}
    </ChakraCheckbox>
  );
};

export default Checkbox;
