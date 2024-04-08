import {
    Typography,
    // Card,
} from "@material-tailwind/react";

import { useFlags } from 'flagsmith/react';

const HomePage = () => {
    const flags = useFlags(['work_in_progress']); // only causes re-render if specified flag values / traits change

    return (
        <>
            {flags.work_in_progress.enabled ? (<Typography variant="h2" color="blue-gray" className="my-40">
                Work in Progress
            </Typography>
            ) : (<div className="mx-auto max-w-screen-md py-12">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                    Welcome to the Game world.
                </Typography>
                <Typography color="gray" className="font-normal my-16">
                    Welcome to our interactive learning platform, where magic meets mathematics! Dive into the enchanting world of the "Magic Memory Card" game, a thrilling memory challenge that tests your recall abilities as you match pairs of magical images. Immerse yourself in the whimsical graphics and addictive gameplay, perfect for all ages.
                    <br /><br />
                    But that's not all— We also have dynamic quiz feature where users can input a specific field or topic, such as "Web Development" or "Artificial Intelligence," and receive a set of 10 multiple-choice questions based on that field. Users can answer all 10 questions, and upon completion, they receive their score indicating the number of correct answers. This interactive quiz functionality allows users to test their knowledge in various domains and provides an engaging way to learn and assess their understanding of different subjects.                </Typography>
                {/* <Card className="overflow-hidden">
                <img
                    alt="nature"
                    className="h-[32rem] w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                />
            </Card> */}
            </div>
            )
            }
        </>
    )

}

export default HomePage;