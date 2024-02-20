import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNumbersLineContext } from "@/context/numbersLineContext";

const Reload = () => {
  const { initializationDialog, setInitializationDialog, setInitializationRuler, initialization } = useNumbersLineContext();
  const cancle = () => setInitializationRuler(false);

  const confirm = () => {
    initialization();
    setInitializationRuler(true);
  };
  return (
    <>
      <AlertDialog open={initializationDialog} onOpenChange={setInitializationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>?אתם רוצים להתחיל מחדש</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancle}>הישארו</AlertDialogCancel>
            <AlertDialogAction onClick={confirm}>מחק הכל</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Reload;
