var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, i as getDefaultState, n as notifyManager, k as useQueryClient, r as reactExports, l as noop, m as shouldThrowError, j as jsxRuntimeExports, d as useAuth, e as useNavigate, a as useActor, b as useQuery, o as ue, c as createActor } from "./index-BfL2YKX-.js";
import { c as createLucideIcon, R as Root, u as useComposedRefs, W as WarningProvider, C as Content, i as composeEventHandlers, j as Title, k as Description, a as Close, l as createDialogScope, P as Portal, O as Overlay, n as createSlottable, o as createContextScope, T as Trigger, b as cn, p as buttonVariants, I as Input, L as LoaderCircle, B as Button, X, m as motion, h as LogOut, D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, q as DialogFooter } from "./proxy-C2WaRF_8.js";
import { B as BookOpen, a as Badge } from "./badge-Dx8jHwIf.js";
import { S as Skeleton } from "./skeleton-BYpl6qp9.js";
import { T as Textarea } from "./textarea-BuSOifED.js";
import { v as validatePdfLink, f as formatTimestamp, b as buildResearchInput, u as unwrapOk, a as buildArticleInput, c as buildPublicationInput, d as buildNoteInput } from "./api-TKou_e4I.js";
import { A as AnimatePresence } from "./index-ESarLDpb.js";
import { F as FlaskConical } from "./flask-conical-TD_GylO8.js";
import { F as FileText } from "./file-text-Ci1wuJqk.js";
import { M as Mail } from "./mail-CVV3hslS.js";
import { C as ChevronDown } from "./chevron-down-CdDaaETk.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a2;
              event.preventDefault();
              (_a2 = cancelRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a2;
    const hasDescription = document.getElementById(
      (_a2 = contentRef.current) == null ? void 0 : _a2.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function PdfLinkInput({
  value,
  onChange,
  ocidPrefix = "pdf_link"
}) {
  const [status, setStatus] = reactExports.useState("idle");
  const [warnMsg, setWarnMsg] = reactExports.useState(null);
  const validatingRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!value) {
      setStatus("idle");
      setWarnMsg(null);
    }
  }, [value]);
  const runValidation = async (url) => {
    if (!url.trim()) return;
    if (validatingRef.current) return;
    validatingRef.current = true;
    setStatus("validating");
    setWarnMsg(null);
    try {
      const { reachable } = await validatePdfLink(url.trim());
      if (reachable) {
        setStatus("ok");
        setWarnMsg(null);
      } else {
        setStatus("warn");
        setWarnMsg(
          "Link may be unreachable or requires authentication. You can still save it."
        );
      }
    } catch {
      setStatus("warn");
      setWarnMsg("Could not validate link. You can still save it.");
    } finally {
      validatingRef.current = false;
    }
  };
  const handleBlur = () => {
    if (value.trim() && status === "idle") {
      runValidation(value);
    }
  };
  const handleValidateClick = () => {
    if (value.trim()) {
      setStatus("idle");
      runValidation(value);
    }
  };
  const handleClear = () => {
    onChange("");
    setStatus("idle");
    setWarnMsg(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": `${ocidPrefix}.input`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "url",
            value,
            onChange: (e) => {
              onChange(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setWarnMsg(null);
              }
            },
            onBlur: handleBlur,
            placeholder: "https://drive.google.com/... or any public PDF link",
            className: [
              "pl-8 pr-9 bg-muted/20 border-border/40 text-foreground",
              "placeholder:text-muted-foreground/50 font-mono text-sm",
              "focus:border-primary focus:ring-1 focus:ring-primary/40",
              "transition-all duration-200",
              status === "ok" ? "border-emerald-500/60 focus:border-emerald-500" : "",
              status === "warn" ? "border-yellow-500/60 focus:border-yellow-500" : ""
            ].filter(Boolean).join(" "),
            "data-ocid": `${ocidPrefix}.url_input`
          }
        ),
        value && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2.5 top-1/2 -translate-y-1/2", children: [
          status === "validating" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 text-primary animate-spin" }),
          status === "ok" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400" }),
          status === "warn" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-yellow-400" })
        ] })
      ] }),
      value && status !== "validating" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          onClick: handleValidateClick,
          className: "shrink-0 h-9 px-3 text-xs border-primary/40 text-primary hover:bg-primary/10 hover:border-primary font-mono",
          "data-ocid": `${ocidPrefix}.validate_button`,
          children: "Check"
        }
      ),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "icon",
          variant: "ghost",
          onClick: handleClear,
          className: "shrink-0 h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
          "aria-label": "Remove PDF link",
          "data-ocid": `${ocidPrefix}.clear_button`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
      status === "ok" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -4 },
          transition: { duration: 0.2 },
          className: "flex items-center gap-1.5 text-xs text-emerald-400 font-body",
          "data-ocid": `${ocidPrefix}.success_state`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 shrink-0" }),
            "Link appears reachable."
          ]
        },
        "ok"
      ),
      status === "warn" && warnMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -4 },
          transition: { duration: 0.2 },
          className: "flex items-start gap-1.5 text-xs text-yellow-400 font-body",
          "data-ocid": `${ocidPrefix}.error_state`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0 mt-px" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: warnMsg })
          ]
        },
        "warn"
      )
    ] }),
    !value && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 font-mono", children: "Paste a Google Drive, Dropbox, S3, or any public direct PDF link." })
  ] });
}
const TABS = [
  { id: "research", label: "Research", icon: FlaskConical },
  { id: "articles", label: "Articles", icon: BookOpen },
  { id: "publications", label: "Publications", icon: FileText },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "contacts", label: "Contact Submissions", icon: Mail }
];
function tagsToString(tags) {
  return tags.join(", ");
}
function stringToTags(s) {
  return s.split(",").map((t) => t.trim()).filter(Boolean);
}
function SectionHeader({ title, onAdd }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: onAdd,
        className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/80 transition-smooth neon-border-cyan",
        "data-ocid": `admin.${title.toLowerCase()}.add_button`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "Add New"
        ]
      }
    )
  ] });
}
function DeleteConfirm({
  open,
  title,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AlertDialogContent,
    {
      className: "glass-card border border-border/40",
      "data-ocid": "admin.delete.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "font-display text-foreground", children: [
            'Delete "',
            title,
            '"?'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This action cannot be undone." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogCancel,
            {
              onClick: onCancel,
              className: "border-border/40",
              "data-ocid": "admin.delete.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: onConfirm,
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
              "data-ocid": "admin.delete.confirm_button",
              children: "Delete"
            }
          )
        ] })
      ]
    }
  ) });
}
function SkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.list.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg bg-muted/30" }, i)) });
}
function Field({
  label,
  htmlFor,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor,
        className: "text-sm font-body font-medium text-muted-foreground",
        children: label
      }
    ),
    children
  ] });
}
const inputClass = "bg-muted/20 border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/40";
function PdfBadge({ fileName }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-mono text-primary/80 bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5 truncate max-w-[160px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3 shrink-0" }),
    fileName
  ] });
}
function ResearchTab({ token }) {
  var _a2;
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = reactExports.useState({
    open: false
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  const [pdfUrl, setPdfUrl] = reactExports.useState("");
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["research"],
    queryFn: async () => actor ? actor.getResearches() : [],
    enabled: !!actor
  });
  const openAdd = () => {
    setForm({
      title: "",
      summary: "",
      description: "",
      tagsStr: "",
      date: "",
      imageUrl: ""
    });
    setPdfUrl("");
    setModal({ open: true });
  };
  const openEdit = (item) => {
    setForm({
      title: item.title,
      summary: item.summary,
      description: item.description,
      tagsStr: tagsToString(item.tags),
      date: item.date,
      imageUrl: item.imageUrl ?? ""
    });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };
  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildResearchInput({
        ...form,
        tags: stringToTags(form.tagsStr ?? ""),
        pdfUrl: pdfUrl.trim() || void 0
      });
      if (modal.item) {
        return unwrapOk(
          await actor.updateResearch(token, modal.item.id, input)
        );
      }
      return unwrapOk(await actor.createResearch(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["research"] });
      ue.success(modal.item ? "Research updated" : "Research created");
      setModal({ open: false });
    },
    onError: (e) => ue.error(String(e))
  });
  const deleteMut = useMutation({
    mutationFn: async (item) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deleteResearch(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["research"] });
      ue.success("Research deleted");
      setDeleteTarget(null);
    },
    onError: (e) => ue.error(String(e))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Research", onAdd: openAdd }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "research", onAdd: openAdd }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        className: "glass-card rounded-xl p-4 flex items-start justify-between gap-4 neon-border-cyan border border-border/20",
        "data-ocid": `admin.research.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-1", children: item.summary }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-2 items-center", children: [
              item.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs px-2 py-0 bg-primary/10 text-primary border-primary/30",
                  children: t
                },
                t
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: item.date }),
              (item.pdfUrl || item.pdfFileName) && /* @__PURE__ */ jsxRuntimeExports.jsx(PdfBadge, { fileName: item.pdfFileName ?? "PDF Link" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => openEdit(item),
                className: "text-primary hover:bg-primary/10",
                "data-ocid": `admin.research.edit_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => setDeleteTarget(item),
                className: "text-destructive hover:bg-destructive/10",
                "data-ocid": `admin.research.delete_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      String(item.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.open,
        onOpenChange: (o) => !saveMut.isPending && setModal({ open: o }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "glass-card border border-border/40 max-w-2xl",
            "data-ocid": "admin.research.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: modal.item ? "Edit Research" : "Add Research" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    value: form.title ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                    "data-ocid": "admin.research.title.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Summary *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    value: form.summary ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, summary: e.target.value })),
                    "data-ocid": "admin.research.summary.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    className: inputClass,
                    rows: 4,
                    value: form.description ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                    "data-ocid": "admin.research.description.textarea"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tags (comma-separated)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: inputClass,
                      placeholder: "e.g. pharmacology, drug",
                      value: form.tagsStr ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, tagsStr: e.target.value })),
                      "data-ocid": "admin.research.tags.input"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: inputClass,
                      placeholder: "e.g. 2024",
                      value: form.date ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                      "data-ocid": "admin.research.date.input"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image URL (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    placeholder: "https://...",
                    value: form.imageUrl ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, imageUrl: e.target.value })),
                    "data-ocid": "admin.research.imageurl.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PDF Link (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PdfLinkInput,
                  {
                    value: pdfUrl,
                    onChange: setPdfUrl,
                    ocidPrefix: "admin.research.pdf"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    onClick: () => setModal({ open: false }),
                    disabled: saveMut.isPending,
                    "data-ocid": "admin.research.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => saveMut.mutate(),
                    disabled: saveMut.isPending || !((_a2 = form.title) == null ? void 0 : _a2.trim()),
                    className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/80",
                    "data-ocid": "admin.research.save_button",
                    children: [
                      saveMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      "Save"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: !!deleteTarget,
        title: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onConfirm: () => deleteTarget && deleteMut.mutate(deleteTarget),
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
function ArticlesTab({ token }) {
  var _a2;
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = reactExports.useState({
    open: false
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(
    {}
  );
  const [pdfUrl, setPdfUrl] = reactExports.useState("");
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => actor ? actor.getArticles() : [],
    enabled: !!actor
  });
  const openAdd = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tagsStr: "",
      date: ""
    });
    setPdfUrl("");
    setModal({ open: true });
  };
  const openEdit = (item) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      tagsStr: tagsToString(item.tags),
      date: item.date
    });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };
  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildArticleInput({
        ...form,
        tags: stringToTags(form.tagsStr ?? ""),
        pdfUrl: pdfUrl.trim() || void 0
      });
      if (modal.item)
        return unwrapOk(await actor.updateArticle(token, modal.item.id, input));
      return unwrapOk(await actor.createArticle(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      ue.success(modal.item ? "Article updated" : "Article created");
      setModal({ open: false });
    },
    onError: (e) => ue.error(String(e))
  });
  const deleteMut = useMutation({
    mutationFn: async (item) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deleteArticle(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      ue.success("Article deleted");
      setDeleteTarget(null);
    },
    onError: (e) => ue.error(String(e))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Articles", onAdd: openAdd }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "articles", onAdd: openAdd }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        className: "glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-border/20",
        "data-ocid": `admin.articles.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-1", children: item.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-accent/30 text-accent",
                  children: item.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: item.date }),
              (item.pdfUrl || item.pdfFileName) && /* @__PURE__ */ jsxRuntimeExports.jsx(PdfBadge, { fileName: item.pdfFileName ?? "PDF Link" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => openEdit(item),
                className: "text-primary hover:bg-primary/10",
                "data-ocid": `admin.articles.edit_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => setDeleteTarget(item),
                className: "text-destructive hover:bg-destructive/10",
                "data-ocid": `admin.articles.delete_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      String(item.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.open,
        onOpenChange: (o) => !saveMut.isPending && setModal({ open: o }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "glass-card border border-border/40 max-w-2xl",
            "data-ocid": "admin.articles.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: modal.item ? "Edit Article" : "Add Article" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    value: form.title ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                    "data-ocid": "admin.articles.title.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Excerpt *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    value: form.excerpt ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, excerpt: e.target.value })),
                    "data-ocid": "admin.articles.excerpt.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Content *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    className: inputClass,
                    rows: 5,
                    value: form.content ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
                    "data-ocid": "admin.articles.content.textarea"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: inputClass,
                      placeholder: "e.g. Pharmacology",
                      value: form.category ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
                      "data-ocid": "admin.articles.category.input"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: inputClass,
                      placeholder: "e.g. 2024-06-15",
                      value: form.date ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                      "data-ocid": "admin.articles.date.input"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tags (comma-separated)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    placeholder: "e.g. drug discovery",
                    value: form.tagsStr ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, tagsStr: e.target.value })),
                    "data-ocid": "admin.articles.tags.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PDF Link (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PdfLinkInput,
                  {
                    value: pdfUrl,
                    onChange: setPdfUrl,
                    ocidPrefix: "admin.articles.pdf"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    onClick: () => setModal({ open: false }),
                    disabled: saveMut.isPending,
                    "data-ocid": "admin.articles.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => saveMut.mutate(),
                    disabled: saveMut.isPending || !((_a2 = form.title) == null ? void 0 : _a2.trim()),
                    className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/80",
                    "data-ocid": "admin.articles.save_button",
                    children: [
                      saveMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      "Save"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: !!deleteTarget,
        title: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onConfirm: () => deleteTarget && deleteMut.mutate(deleteTarget),
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
function PublicationsTab({ token }) {
  var _a2;
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = reactExports.useState({
    open: false
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  const [pdfUrl, setPdfUrl] = reactExports.useState("");
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["publications"],
    queryFn: async () => actor ? actor.getPublications() : [],
    enabled: !!actor
  });
  const openAdd = () => {
    setForm({
      title: "",
      authorsStr: "",
      yearStr: String((/* @__PURE__ */ new Date()).getFullYear()),
      journal: "",
      doi: "",
      abstract: ""
    });
    setPdfUrl("");
    setModal({ open: true });
  };
  const openEdit = (item) => {
    setForm({
      title: item.title,
      authorsStr: tagsToString(item.authors),
      yearStr: String(item.year),
      journal: item.journal,
      doi: item.doi ?? "",
      abstract: item.abstract,
      imageUrl: item.imageUrl ?? ""
    });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };
  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildPublicationInput({
        ...form,
        authors: stringToTags(form.authorsStr ?? ""),
        year: BigInt(
          Number.parseInt(form.yearStr ?? "2024", 10) || (/* @__PURE__ */ new Date()).getFullYear()
        ),
        pdfUrl: pdfUrl.trim() || void 0
      });
      if (modal.item)
        return unwrapOk(
          await actor.updatePublication(token, modal.item.id, input)
        );
      return unwrapOk(await actor.createPublication(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      ue.success(modal.item ? "Publication updated" : "Publication created");
      setModal({ open: false });
    },
    onError: (e) => ue.error(String(e))
  });
  const deleteMut = useMutation({
    mutationFn: async (item) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deletePublication(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      ue.success("Publication deleted");
      setDeleteTarget(null);
    },
    onError: (e) => ue.error(String(e))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Publications", onAdd: openAdd }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "publications", onAdd: openAdd }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        className: "glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-border/20",
        "data-ocid": `admin.publications.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              item.authors.slice(0, 2).join(", "),
              " • ",
              item.journal,
              " •",
              " ",
              String(item.year)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-1.5 items-center", children: [
              item.doi && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary/70 truncate", children: [
                "DOI: ",
                item.doi
              ] }),
              (item.pdfUrl || item.pdfFileName) && /* @__PURE__ */ jsxRuntimeExports.jsx(PdfBadge, { fileName: item.pdfFileName ?? "PDF Link" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => openEdit(item),
                className: "text-primary hover:bg-primary/10",
                "data-ocid": `admin.publications.edit_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => setDeleteTarget(item),
                className: "text-destructive hover:bg-destructive/10",
                "data-ocid": `admin.publications.delete_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      String(item.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.open,
        onOpenChange: (o) => !saveMut.isPending && setModal({ open: o }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "glass-card border border-border/40 max-w-2xl",
            "data-ocid": "admin.publications.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: modal.item ? "Edit Publication" : "Add Publication" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    value: form.title ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                    "data-ocid": "admin.publications.title.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Authors (comma-separated) *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    placeholder: "e.g. Ashwin S. Chouhan, Co-Author",
                    value: form.authorsStr ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, authorsStr: e.target.value })),
                    "data-ocid": "admin.publications.authors.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Year *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: inputClass,
                      type: "number",
                      placeholder: "2024",
                      value: form.yearStr ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, yearStr: e.target.value })),
                      "data-ocid": "admin.publications.year.input"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Journal *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: inputClass,
                      placeholder: "Journal name",
                      value: form.journal ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, journal: e.target.value })),
                      "data-ocid": "admin.publications.journal.input"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "DOI (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    placeholder: "10.xxxx/xxxxx",
                    value: form.doi ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, doi: e.target.value })),
                    "data-ocid": "admin.publications.doi.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Abstract *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    className: inputClass,
                    rows: 4,
                    value: form.abstract ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, abstract: e.target.value })),
                    "data-ocid": "admin.publications.abstract.textarea"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PDF Link (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PdfLinkInput,
                  {
                    value: pdfUrl,
                    onChange: setPdfUrl,
                    ocidPrefix: "admin.publications.pdf"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    onClick: () => setModal({ open: false }),
                    disabled: saveMut.isPending,
                    "data-ocid": "admin.publications.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => saveMut.mutate(),
                    disabled: saveMut.isPending || !((_a2 = form.title) == null ? void 0 : _a2.trim()),
                    className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/80",
                    "data-ocid": "admin.publications.save_button",
                    children: [
                      saveMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      "Save"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: !!deleteTarget,
        title: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onConfirm: () => deleteTarget && deleteMut.mutate(deleteTarget),
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
function NotesTab({ token }) {
  var _a2;
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = reactExports.useState({
    open: false
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  const [pdfUrl, setPdfUrl] = reactExports.useState("");
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => actor ? actor.getNotes() : [],
    enabled: !!actor
  });
  const openAdd = () => {
    setForm({ title: "", content: "" });
    setPdfUrl("");
    setModal({ open: true });
  };
  const openEdit = (item) => {
    setForm({ title: item.title, content: item.content });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };
  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildNoteInput({
        ...form,
        pdfUrl: pdfUrl.trim() || void 0
      });
      if (modal.item)
        return unwrapOk(await actor.updateNote(token, modal.item.id, input));
      return unwrapOk(await actor.createNote(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      ue.success(modal.item ? "Note updated" : "Note created");
      setModal({ open: false });
    },
    onError: (e) => ue.error(String(e))
  });
  const deleteMut = useMutation({
    mutationFn: async (item) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deleteNote(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      ue.success("Note deleted");
      setDeleteTarget(null);
    },
    onError: (e) => ue.error(String(e))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Notes", onAdd: openAdd }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "notes", onAdd: openAdd }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        className: "glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-border/20",
        "data-ocid": `admin.notes.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-1", children: item.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-1.5 items-center", children: [
              (item.pdfUrl || item.pdfFileName || item.fileName) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                PdfBadge,
                {
                  fileName: item.pdfFileName ?? item.fileName ?? "PDF Link"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: formatTimestamp(item.createdAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => openEdit(item),
                className: "text-primary hover:bg-primary/10",
                "data-ocid": `admin.notes.edit_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => setDeleteTarget(item),
                className: "text-destructive hover:bg-destructive/10",
                "data-ocid": `admin.notes.delete_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      String(item.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.open,
        onOpenChange: (o) => !saveMut.isPending && setModal({ open: o }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "glass-card border border-border/40 max-w-2xl",
            "data-ocid": "admin.notes.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: modal.item ? "Edit Note" : "Add Note" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: inputClass,
                    value: form.title ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                    "data-ocid": "admin.notes.title.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Content *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    className: inputClass,
                    rows: 5,
                    value: form.content ?? "",
                    onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
                    "data-ocid": "admin.notes.content.textarea"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PDF Link (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PdfLinkInput,
                  {
                    value: pdfUrl,
                    onChange: setPdfUrl,
                    ocidPrefix: "admin.notes.pdf"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    onClick: () => setModal({ open: false }),
                    disabled: saveMut.isPending,
                    "data-ocid": "admin.notes.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => saveMut.mutate(),
                    disabled: saveMut.isPending || !((_a2 = form.title) == null ? void 0 : _a2.trim()),
                    className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/80",
                    "data-ocid": "admin.notes.save_button",
                    children: [
                      saveMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      "Save"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: !!deleteTarget,
        title: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onConfirm: () => deleteTarget && deleteMut.mutate(deleteTarget),
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
function ContactsTab({ token }) {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getContactSubmissions(token);
      if (result.__kind__ === "ok") {
        return [...result.ok].sort(
          (a, b) => Number(b.submittedAt - a.submittedAt)
        );
      }
      return [];
    },
    enabled: !!actor
  });
  const markReadMut = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.markContactRead(token, id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
    onError: (e) => ue.error(String(e))
  });
  const handleExpand = reactExports.useCallback(
    (sub) => {
      const id = sub.id;
      setExpandedId((prev) => prev === id ? null : id);
      if (!sub.isRead) markReadMut.mutate(id);
    },
    [markReadMut]
  );
  const unreadCount = items.filter((i) => !i.isRead).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Contact Submissions" }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/20 text-accent border-accent/40", children: [
        unreadCount,
        " unread"
      ] })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card rounded-xl p-12 text-center border border-border/20",
        "data-ocid": "admin.contacts.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-12 h-12 mx-auto text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "No contact submissions yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((sub, i) => {
      const isExpanded = expandedId === sub.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.04 },
          className: `glass-card rounded-xl border transition-smooth ${sub.isRead ? "border-border/20" : "border-accent/30 neon-border-cyan"}`,
          "data-ocid": `admin.contacts.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full p-4 flex items-start justify-between gap-4 text-left",
                onClick: () => handleExpand(sub),
                "data-ocid": `admin.contacts.toggle.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [
                    !sub.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent mt-2 shrink-0 animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: sub.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: sub.email })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-1", children: sub.message })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60 hidden sm:block", children: formatTimestamp(sub.submittedAt) }),
                    isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.2 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-0 border-t border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2 mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Email:" }),
                    " ",
                    sub.email
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Submitted:" }),
                    " ",
                    formatTimestamp(sub.submittedAt)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-3 rounded-lg bg-muted/20 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: sub.message }) }),
                  sub.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 mt-2", children: "✓ Read" })
                ] })
              }
            ) })
          ]
        },
        String(sub.id)
      );
    }) })
  ] });
}
function EmptyState({ label, onAdd }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-12 text-center border border-border/20",
      "data-ocid": `admin.${label}.empty_state`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-12 h-12 mx-auto text-muted-foreground/40 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body mb-4", children: [
          "No ",
          label,
          " yet. Add the first one!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onAdd,
            className: "bg-primary text-primary-foreground hover:bg-primary/80 gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Add ",
              label
            ]
          }
        )
      ]
    }
  );
}
function AdminPage() {
  const { sessionToken, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("research");
  const handleLogout = async () => {
    await logout();
    navigate({ to: "/" });
  };
  if (!sessionToken) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-card/60 backdrop-blur-md border-r border-border/30 sticky top-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-bold text-sm", children: "A" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Admin Panel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PharmacyGuide" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-4 space-y-1", children: TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-smooth ${isActive ? "bg-primary/15 text-primary border border-primary/30 glow-cyan" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`,
            "data-ocid": `admin.sidebar.${tab.id}.tab`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0" }),
              tab.label
            ]
          },
          tab.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          onClick: handleLogout,
          className: "w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive",
          "data-ocid": "admin.sidebar.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Logout"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-h-screen min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border/30 px-4 py-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: handleLogout,
            className: "gap-2 text-destructive hover:bg-destructive/10",
            "data-ocid": "admin.mobile.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only sm:not-sr-only", children: "Logout" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden overflow-x-auto border-b border-border/30 bg-card/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex px-2 py-2 gap-1 min-w-max", children: TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-smooth ${isActive ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"}`,
            "data-ocid": `admin.mobiletab.${tab.id}.tab`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
              tab.label
            ]
          },
          tab.id
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -16 },
          transition: { duration: 0.2 },
          children: [
            activeTab === "research" && /* @__PURE__ */ jsxRuntimeExports.jsx(ResearchTab, { token: sessionToken }),
            activeTab === "articles" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArticlesTab, { token: sessionToken }),
            activeTab === "publications" && /* @__PURE__ */ jsxRuntimeExports.jsx(PublicationsTab, { token: sessionToken }),
            activeTab === "notes" && /* @__PURE__ */ jsxRuntimeExports.jsx(NotesTab, { token: sessionToken }),
            activeTab === "contacts" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactsTab, { token: sessionToken })
          ]
        },
        activeTab
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/20 px-6 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 font-body", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            className: "text-primary/60 hover:text-primary transition-colors",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "caffeine.ai"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  AdminPage as default
};
