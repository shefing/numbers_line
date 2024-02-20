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
  const { initializationDialog, setInitializationDialog, initialization } = useNumbersLineContext();

  return (
    <>
      <AlertDialog open={initializationDialog} onOpenChange={setInitializationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>?אתם רוצים להתחיל מחדש</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>הישארו</AlertDialogCancel>
            <AlertDialogAction onClick={initialization}>מחק הכל</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Reload;
