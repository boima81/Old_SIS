import sub from "date-fns/sub";

const exampleActivitiesData = [
  {
    id: "493190c9-5b61-4912-afe5-78c21f1044d7",
    icon: "heroicons-solid:star",
    description: "Your submission has been accepted",
    date: sub(new Date(), { minutes: 25 }),
    extraContent: `<div class="font-bold">Congratulations for your acceptance!</div><br>
                        <div>Hi Brian,<br>Your submission has been accepted and you are ready to move into the next phase. Once you are ready, reach out to me and we will ...</div>`,
  },
  {
    id: "6e3e97e5-effc-4fb7-b730-52a151f0b641",
    image: "assets/images/avatars/profile.jpg",
    description:
      "<strong>Leo Gill</strong> added you to <strong>Top Secret Project</strong> group and assigned you as a <strong>Project Manager</strong>",
    date: sub(new Date(), { minutes: 50 }),
    linkedContent: "Top Secret Project",
    link: "/dashboards/project",
    useRouter: true,
  },
  {
    id: "b91ccb58-b06c-413b-b389-87010e03a120",
    icon: "heroicons-solid:mail",
    description: "You have 15 unread mails across 3 mailboxes",
    date: sub(new Date(), { hours: 3 }),
    linkedContent: "Mailbox",
    link: "/apps/mailbox",
    useRouter: true,
  },
  {
    id: "541416c9-84a7-408a-8d74-27a43c38d797",
    icon: "heroicons-solid:refresh",
    description: "Your <strong>Docker container</strong> is ready to publish",
    date: sub(new Date(), { hours: 5 }),
    linkedContent: "Download the container",
    link: ".",
    useRouter: true,
  },
  {
    id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
    image: "assets/images/avatars/male-06.jpg",
    description: "<strong>Roger Murray</strong> accepted your friend request",
    date: sub(new Date(), { hours: 7 }),
    extraContent: `You have <span class="font-semibold">8</span> mutual friends.`,
  },
  {
    id: "eb8aa470-635e-461d-88e1-23d9ea2a5665",
    image: "assets/images/avatars/feprofile.jpg",
    description: "<strong>Sophie Stone</strong> sent you a direct message",
    date: sub(new Date(), { hours: 9 }),
  },
  {
    id: "b85c2338-cc98-4140-bbf8-c226ce4e395e",
    icon: "heroicons-solid:mail",
    description: "You have 3 new mails",
    date: sub(new Date(), { days: 1 }),
    extraContent: `<ol class="list-decimal list-inside space-y-2">
                            <li class="font-medium">Please review and sign the attached agreement</li>
                            <li class="font-medium">Delivery address confirmation</li>
                            <li class="font-medium">Previous clients and their invoices</li>
                        </ol>`,
    linkedContent: "Mailbox",
    link: "/apps/mailbox",
    useRouter: true,
  },
  {
    id: "fd0f01b4-f3de-4333-add5-cd86850279f8",
    image: "assets/images/avatars/female-02.jpg",
    description: "<strong>Tina Harris</strong> started a chat with you",
    date: sub(new Date(), { days: 1 }),
    linkedContent: "Go to Chat (Tina Harris)",
    link: "/apps/chat/5636c0ba-fa47-42ca-9160-27340583041e",
    useRouter: true,
  },
  {
    id: "8f8e1bf9-4661-4939-9e43-390957b60f42",
    icon: "heroicons-solid:star",
    description:
      "Your submission has been accepted and you are ready to sign-up for the final assigment which will be ready in 2 days",
    date: sub(new Date(), { days: 3 }),
  },
  {
    id: "30af917b-7a6a-45d1-822f-9e7ad7f8bf69",
    icon: "heroicons-solid:refresh",
    description: "Your Vagrant container is ready to download",
    date: sub(new Date(), { days: 4 }),
  },
];

export default exampleActivitiesData;
