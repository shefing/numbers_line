import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useHelpers } from "@/hooks/useHelpers";
import { t } from "i18next";
import { ILanguage } from "@/type/language";
const Restart = () => {
  const { language, rulerType, openRestartDialog, setOpenRestartDialog, setrulerTypeShould } = useNumbersLineContext();
  const { restart } = useHelpers();
  return (
    <AlertDialog open={openRestartDialog} onOpenChange={setOpenRestartDialog}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("restart_question")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={`${language === ILanguage.AR && "text-[18px]"}`} onClick={() => setrulerTypeShould(rulerType)}>
            {t("stay")}
          </AlertDialogCancel>
          <AlertDialogAction className={`${language === ILanguage.AR && "text-[18px]"}`} onClick={restart}>
            {t("delete_all")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Restart;
