import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useAction } from "../hooks/useAction";

const Restart = () => {
  const { typeRuler, openRestartDialog, setOpenRestartDialog, setTypeRulerChange } = useNumbersLineContext();
  const { initialization } = useAction();

  return (
    <AlertDialog open={openRestartDialog} onOpenChange={setOpenRestartDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>?אתם רוצים להתחיל מחדש</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setTypeRulerChange(typeRuler)}>הישארו</AlertDialogCancel>
          <AlertDialogAction onClick={initialization}>מחק הכל</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Restart;
