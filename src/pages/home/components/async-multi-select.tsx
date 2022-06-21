import { AsyncProps, chakraComponents, GroupBase } from "chakra-react-select";

export const asyncMultiSelectProps: AsyncProps<any, true, GroupBase<any>> = {
  isMulti: true,
  tagVariant: "outline",
  focusBorderColor: "green.500",
  components: {
    ClearIndicator: () => null,
    DropdownIndicator: () => null,
    LoadingIndicator: () => null,
    IndicatorSeparator: () => null,
    Menu: (props) => {
      if (props.options.length === 0) {
        return null;
      }
      return <chakraComponents.Menu {...props} />;
    },
  },
  chakraStyles: {
    control: (provided) => ({
      ...provided,
      _hover: {
        borderColor: "gray.500",
      },
      _focusWithin: {
        borderColor: "gray.500",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: `0.25rem 0.5rem`,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "sm",
    }),
    input: (provided) => ({
      ...provided,
      fontSize: "sm",
    }),
    multiValue: (provided) => ({
      ...provided,
      color: "#EE748F",
      boxShadow: `inset 0 0 0px 1px #EE748F`,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    menuList: (provided) => ({
      ...provided,
      py: 0,
      backgroundColor: "surfaceBackground",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "sm",
      _hover: {
        backgroundColor: "gray.700",
      },
    }),
  },
};
