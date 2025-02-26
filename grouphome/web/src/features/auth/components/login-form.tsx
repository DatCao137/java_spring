import { Button } from '@/components/ui/button';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  return (
    <div>
      <Button className="w-full" onClick={onSuccess}>
        go to top
      </Button>
    </div>
  );
};
