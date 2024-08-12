import { FunctionComponent, PropsWithChildren, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../ui/select'; // Import Select components from shadcn UI

interface PaginationContainerProps {
    maxItemsPerPage: number;
}

const PaginationContainer: FunctionComponent<PropsWithChildren<PaginationContainerProps>> = ({ children, maxItemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Convert children to an array for easier slicing
    const childrenArray = Array.isArray(children) ? children : [children];
    const totalItems = childrenArray.length;
    const totalPages = Math.ceil(totalItems / maxItemsPerPage);

    const isLastPage = currentPage === totalPages;

    // Calculate the index range for the current page
    const startIndex: number = (currentPage - 1) * maxItemsPerPage;
    const endIndex: number = startIndex + maxItemsPerPage;

    const currentChildren = childrenArray.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];

        if (currentPage > 4) {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => goToPage(1)} className='cursor-pointer'>
                        1
                    </PaginationLink>
                </PaginationItem>,
                <PaginationEllipsis key="ellipsis-left" />
            );
        }

        const startPage = currentPage > 4 ? currentPage - 1 : 1;
        const endPage = Math.min(currentPage + 2, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink 
                        onClick={() => goToPage(i)} 
                        isActive={i === currentPage}
                        className='cursor-pointer'
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <PaginationEllipsis key="ellipsis-right" />,
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => goToPage(totalPages)} className='cursor-pointer'>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <>
            {currentChildren}
            {totalItems > 0 && (
                <div className="w-full flex flex-col md:flex-row mt-3 md:mt-9">
                    <Pagination className='mb-3 md:mb-0'>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => goToPage(currentPage - 1)} 
                                    className={`hidden md:flex cursor-pointer ${currentPage === 1 ? 'cursor-not-allowed text-gray-400 hover:text-gray-400' : 'text-gray-950 hover:text-gray-800'}`} 
                                />
                            </PaginationItem>
                            {renderPagination()}
                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => goToPage(currentPage + 1)} 
                                    className={`hidden md:flex cursor-pointer ${isLastPage ? 'cursor-not-allowed text-gray-400 hover:text-gray-400' : 'text-gray-950 hover:text-gray-800'}`} 
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    
                    {totalPages > 4 && (
                        <Select>
                            <SelectTrigger className="cursor-pointer w-32">
                                Select Page
                            </SelectTrigger>
                            <SelectContent className='bg-white h-40 md:h-56 overflow-y-auto'>
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <SelectItem key={i} onClick={() => goToPage(i + 1)} value={`${i + 1}`}>
                                        Page {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            )}
        </>
    );
};

export default PaginationContainer;