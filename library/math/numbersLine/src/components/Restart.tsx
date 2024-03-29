import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useHelpers } from "@/hooks/useHelpers";

const Restart = () => {
  const { rulerType, openRestartDialog, setOpenRestartDialog, setrulerTypeShould } = useNumbersLineContext();
  const { restart } = useHelpers();
  //e.preventDefault() - to prevent auto focous in AlertDialogCancel
  return (
    <AlertDialog open={openRestartDialog} onOpenChange={setOpenRestartDialog}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>?אתם רוצים להתחיל מחדש</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setrulerTypeShould(rulerType)}>הישארו</AlertDialogCancel>
          <AlertDialogAction onClick={restart}>מחק הכל</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Restart;
