import com.ca3.branchObserver.BranchObserver;
import com.ca3.eventObserver.EventObserver;
import com.ca3.projectObserver.ProjectObserver;
import com.ca3.repositoryObserver.RepositoryObserver;
import com.ca3.room.Room;

public class Main {
    public static void main(String[] args) {
        // Create a different room for each one of the subjects
        Room projectRoom = new Room();
        Room repositoryRoom = new Room();
        Room branchRoom = new Room();
        Room eventRoom = new Room();

        // Create three members that will list to any update on the Project subject
        new ProjectObserver(projectRoom);
        new ProjectObserver(projectRoom);
        new ProjectObserver(projectRoom);

        System.out.println("Notify all members about the Project update.");
        projectRoom.setMessage("Bug has been found in login form, please add validation for email.");

        // Create three members that will list to any update on the Repository
        new RepositoryObserver(repositoryRoom);
        new RepositoryObserver(repositoryRoom);
        new RepositoryObserver(repositoryRoom);

        System.out.println("Notify all members about the Repository update.");
        repositoryRoom.setMessage("A new Pull Request has been merged into master, please rebase your branches.");

        // Create three members that will list to any update on the Branch
        new BranchObserver(branchRoom);
        new BranchObserver(branchRoom);
        new BranchObserver(branchRoom);

        System.out.println("Notify all members about the Branch update.");
        branchRoom.setMessage("A new branch has been pushed.");

        // Create three members that will list to any update related to a Event
        new EventObserver(eventRoom);
        new EventObserver(eventRoom);
        new EventObserver(eventRoom);

        System.out.println("Notify all members about a Event.");
        eventRoom.setMessage("DevOps event next Thursday at noon, let's refresh our kubernetes skills, please join us!.");
    }
}
