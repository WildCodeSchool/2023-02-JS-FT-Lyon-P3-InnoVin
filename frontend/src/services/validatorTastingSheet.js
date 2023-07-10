import { useState } from "react";

const handleRadioChange = () => {
  const [isColorValid, setIsColorValid] = useState(false);
  const [isIntensityValid, setIsIntensityValid] = useState(false);
  const [isFluidityValid, setIsFluidityValid] = useState(false);
  const [isAromaValid, setIsAromaValid] = useState(false);
  const [isFamilyValid, setIsFamilyValid] = useState(false);
  const [isFlavorValid, setIsFlavorValid] = useState(false);
  const [isStructureValid, setIsStructureValid] = useState(false);
  const [isPersistenceValid, setIsPersistenceValid] = useState(false);

  const color = document.querySelectorAll("input[name='color']");
  const intensity = document.querySelectorAll("input[name='intensity']");
  const fluidity = document.querySelectorAll("input[name='fluidity']");
  const aroma = document.querySelectorAll("input[name='aroma']");
  const family = document.querySelectorAll("input[name='family']");
  const flavor = document.querySelectorAll("input[name='flavor']");
  const structure = document.querySelectorAll("input[name='structure']");
  const persistence = document.querySelectorAll("input[name='persistence']");

  color.forEach((col) => {
    if (col.checked) {
      setIsColorValid(true);
    }
  });

  intensity.forEach((int) => {
    if (int.checked) {
      setIsIntensityValid(true);
    }
  });
  fluidity.forEach((flu) => {
    if (flu.checked) {
      setIsFluidityValid(true);
    }
  });
  aroma.forEach((aro) => {
    if (aro.checked) {
      setIsAromaValid(true);
    }
  });
  family.forEach((fam) => {
    if (fam.checked) {
      setIsFamilyValid(true);
    }
  });
  flavor.forEach((fla) => {
    if (fla.checked) {
      setIsFlavorValid(true);
    }
  });
  structure.forEach((str) => {
    if (str.checked) {
      setIsStructureValid(true);
    }
  });
  persistence.forEach((per) => {
    if (per.checked) {
      setIsPersistenceValid(true);
    }
  });

  const isFormValid =
    isColorValid &&
    isFluidityValid &&
    isIntensityValid &&
    isAromaValid &&
    isFamilyValid &&
    isFlavorValid &&
    isStructureValid &&
    isPersistenceValid &&
    rate > 0;

  setValidateForm(isFormValid);
};
export default handleRadioChange;
