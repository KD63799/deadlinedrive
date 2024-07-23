import QuoteCard from "@components/QuoteCard/QuoteCard";
import ScrollToTopButton from "@components/ScrollToTopButton/ScrollToTopButton";

export default function Quotes (){
    return (
       <>
       <div className="md:min-h-[88.5vh] sm:min-h-[80vh]">
       <QuoteCard />
       <ScrollToTopButton />
       </div>
       </> 
    )
}