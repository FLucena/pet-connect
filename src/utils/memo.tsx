import React, { memo } from 'react';

interface MemoOptions<P extends object> {
  areEqual?: (prevProps: P, nextProps: P) => boolean;
}

export function memoizeComponent<P extends object>(
  Component: React.ComponentType<P>,
  options: MemoOptions<P> = {}
): React.MemoExoticComponent<React.ComponentType<P>> {
  const { areEqual } = options;
  
  return memo(Component, areEqual);
}

// Example usage:
/*
import { memoizeComponent } from '../utils/memo';

interface MyComponentProps {
  prop1: string;
  prop2: number;
}

const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  // Component logic
};

// Basic memoization
export default memoizeComponent(MyComponent);

// With custom comparison
export default memoizeComponent(MyComponent, {
  areEqual: (prevProps, nextProps) => {
    return prevProps.prop1 === nextProps.prop1;
  }
});
*/ 