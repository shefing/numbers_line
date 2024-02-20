import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useAction } from "../hooks/useActionHook";

const Reload = () => {
  const { isOpenDialog, setIsOpenDialog } = useNumbersLineContext();
  const { initialization } = useAction();

  return (
    <>
      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
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
