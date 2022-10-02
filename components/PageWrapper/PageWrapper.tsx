import { Paper } from "@mantine/core";
import { PageFooter } from "./PageFooter/PageFooter";

import { PageHeader } from "./PageHeader/PageHeader";
import { PageWrapperProps } from "./PageWrapper.definition";
import { useStyles } from "./PageWrapper.style";

export function PageWrapper(props: PageWrapperProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <PageHeader />
      <Paper className={classes.contentWrapper}>{props.children}</Paper>
      <PageFooter />
    </div>
  );
}
