import MyPageLayout from "../../components/common/MyPageLayout";
import MyWorkJournal from "../../components/mypage/MyWorkJournal";

const WorkJournalPage =()=>{
    return(
        <MyPageLayout title="활동일지">
            <MyWorkJournal />
        </MyPageLayout>
    )
}
export default WorkJournalPage;