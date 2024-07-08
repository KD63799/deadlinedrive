import QuoteManage from "@components/QuoteManage/QuoteManage";
import ScrollToTopButton from "@components/ScrollToTopButton/ScrollToTopButton";

export default function ManageMyQuotes() {
    return(
        <>
        <main className="md:min-h-[88.5vh] max-sm:min-h-[78vh]">
        <QuoteManage />
        <ScrollToTopButton />
        </main>
        </>
    )
}