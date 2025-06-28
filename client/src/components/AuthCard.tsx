type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent-2">
    <div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        {title}
      </h2>
      {children}
    </div>
  </div>
);
export default AuthCard;
