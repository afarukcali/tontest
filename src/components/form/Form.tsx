import { useForm } from "react-hook-form";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { CenteringWrapper, JettonFormTitle, StyledActionBtn, StyledForm, StyledFormInputs } from "../form/styled";
import { Input } from "../form/input";
import { AppHeading } from "../appInput/appHeading";
import { AppButton } from "../appButton";

interface FormProps {
  onSubmit: (values: any) => Promise<void>;
  inputs: any[];
  disableExample?: boolean;
  submitText: string;
  defaultValues?: {};
  onCancel?: () => void;
}

export function Form({ onSubmit, inputs, disableExample, submitText, defaultValues, onCancel }: FormProps) {
  // const { showNotification } = useNotification();
  // const { address, toggleConnect } = useConnectionStore();
  // const { jettonLogo, setIconHover } = useJettonLogo();
  const [logoAlertPopup, setLogoAlertPopup] = useState(false);
  const [editLogoPopup, setEditLogoPopup] = useState(false);
  // const { jettonAddress } = useJettonAddress();
  const matches = useMediaQuery("(max-width:599px)");
  const tokenImage = inputs.filter((i) => i.name === "tokenImage")?.[0];
  const { control, handleSubmit, formState, setValue, clearErrors, watch, getValues } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });
  const errors = formState.errors as any;
  const onFormError = (value: any) => {
    const firstError = value[Object.keys(value)[0]];
    if (!firstError) {
      return;
    }
    // showNotification(<>{firstError.message}</>, "warning", undefined, 3000);
  };

  const onExampleClick = useCallback((name: never, value: never) => {
    setValue(name, value);
  }, []);

  const closeEditLogoPopup = useCallback(() => setEditLogoPopup(false), []);

  const closeAlertLogoPopup = useCallback(() => setLogoAlertPopup(false), []);

  const jettonData: any = watch();

  // useEffect(() => {
  //   //@ts-ignore
  //   setValue("tokenImage", jettonLogo.logoUrl);
  // }, [jettonLogo.logoUrl]);

  return (
    <StyledForm
      onSubmit={handleSubmit(() => {
        // if (!jettonLogo.logoUrl || jettonLogo.hasError) {
        //   setLogoAlertPopup(true);
        //   return;
        // }
        onSubmit(getValues());
      }, onFormError)}
    >
      {/* <EditLogoPopup showExample={!jettonAddress} showPopup={editLogoPopup} tokenImage={tokenImage} close={closeEditLogoPopup} /> */}
      {/* <LogoAlertPopup isUpdateText={!!jettonAddress} showPopup={logoAlertPopup} close={closeAlertLogoPopup} onValidate={handleSubmit(onSubmit, onFormError)} /> */}
      <Box sx={{ display: "flex" }} mb={3}>
        {/* <CenteringWrapper></CenteringWrapper> */}
        <StyledFormInputs>
          {inputs
            .filter((i) => i.name !== "tokenImage")
            .filter((i) => !i.disabled)
            .map((spec: any, index: number) => {
              return (
                <>
                  <JettonFormTitle>{spec.label}</JettonFormTitle>
                  <Input
                    disableExample={disableExample}
                    required={spec.required}
                    description={spec.description}
                    clearErrors={clearErrors}
                    key={index}
                    error={errors[spec.name]}
                    name={spec.name}
                    type={spec.type}
                    control={control}
                    defaultValue={spec.default || ""}
                    onExampleClick={() => onExampleClick(spec.name as never, spec.default as never)}
                    disabled={spec.disabled}
                    errorMessage={spec.errorMessage}
                    validate={spec.validate}
                    showDefault={spec.showDefault}
                  />
                </>
              );
            })}
        </StyledFormInputs>
      </Box>
      <StyledActionBtn>
        <CenteringWrapper sx={{ justifyContent: "center" }}>
          {/* {onCancel && (
              <Box sx={{ width: 96, height: 44 }}>
                <AppButton disabled={jettonLogo.isLoading} transparent onClick={onCancel} type="button">
                  Cancel
                </AppButton>
              </Box>
            )} */}
          <Box sx={{ width: 110, height: 44 }} ml={2}>
            <AppButton type="submit">{submitText}</AppButton>
          </Box>
        </CenteringWrapper>
      </StyledActionBtn>
    </StyledForm>
  );
}
