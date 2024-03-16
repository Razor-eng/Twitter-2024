import { ThemeProvider } from 'next-themes';

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider enableSystem={true} attribute='class'>
            <div className="dark:bg-black dark:text-gray-200 text-gray-700 transition-colors duration-300 min-h-screen">
                {children}
            </div>
        </ThemeProvider>
    )
}

export default Provider