import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetCategoryQuery, useGetProductIdQuery } from "../../redux/slice/client/category";

function Sidekatalg() {
  const { data, isLoading } = useGetCategoryQuery();

  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
 
  return (
    <Card className="w-full max-w-[20rem] bg-fixed shadow-xl">
      
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          {data?.map((item)=>(
                    //   <ListItem className="p-0" selected={open === 1}>
                    //     <ListItemPrefix>
                    //       <PresentationChartBarIcon className="h-5 w-5" />
                    //     </ListItemPrefix>
                    //     <Typography color="blue-gray" className="mr-auto font-normal">
                    //       {item?.title}
                    //     </Typography>
                    // </ListItem>
             <div>
                <NavLink
                className={"no-underline "}
                to={`/categories/${item?.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/categories/${item?.id}`);
                  }}>
                    <ListItem className="text-sm">

                    {item?.title}
                  </ListItem>
                  </NavLink>
                  <hr className="my-1 border-blue-500" />
             </div>
          ))}

        </Accordion>
      </List>
    </Card>
  );
}

 
export default Sidekatalg