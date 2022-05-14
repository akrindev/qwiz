import { AspectRatio, Box, createStyles } from '@mantine/core';
import { motion } from 'framer-motion';
import { useSlide } from 'hooks/api/slide';
import { useBackgroundColor } from 'hooks/use-background-color';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { DraggableElement } from './DraggableElement';

export const MainSlide = () => {
  const router = useRouter();
  const { slideId } = router.query;

  const { data: slide } = useSlide(slideId as string);

  const { classes } = useStyles();
  const { backgroundColor } = useBackgroundColor();

  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <AspectRatio ratio={16 / 9}>
      <Box className={classes.box} style={{ backgroundColor }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
          }}
          ref={constraintsRef}
        />
        {slide?.elements?.map((element) => (
          <DraggableElement
            key={element.id}
            initial={{
              // TODO: mislav shall fix this :maja:
              x: element.point.x as unknown as number,
              y: element.point.y as unknown as number,
            }}
            constraintsRef={constraintsRef}
            id={element.point.id}
            dimensions={{
              width: element?.point?.width,
              height: element?.point?.height,
            }}
            type={element.questionContent.type}
            content={element.questionContent.content}
          />
        ))}
      </Box>
    </AspectRatio>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderRadius: theme.radius.md,
    position: 'relative',
  },
}));
