import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useHelpers } from "@/hooks/useHelpers";
import { t } from "i18next";

const Restart = () => {
  const { rulerType, openRestartDialog, setOpenRestartDialog, setrulerTypeShould } = useNumbersLineContext();
  const { restart } = useHelpers();
  return (
    <AlertDialog open={openRestartDialog} onOpenChange={setOpenRestartDialog}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("restart_question")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setrulerTypeShould(rulerType)}>{t("stay")}</AlertDialogCancel>
          <AlertDialogAction onClick={restart}>{t("delete_all")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Restart;
