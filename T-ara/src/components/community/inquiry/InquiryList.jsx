import InquiryItem from "./InquiryItem";

const InquiryList = ({ inquiries, openIndex, onToggleInquiry, onDelete }) => (
  <ul className="space-y-6 mt-6">
    {inquiries.map((inquiry, index) => (
      <InquiryItem
        key={inquiry.inquiryId}
        inquiry={inquiry}
        isOpen={openIndex === index}
        onToggle={() => onToggleInquiry(index)}
        onDelete={onDelete}  
      />
    ))}
  </ul>
);

export default InquiryList;
