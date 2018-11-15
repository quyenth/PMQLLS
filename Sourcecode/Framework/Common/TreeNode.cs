using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Framework.Common
{
    /// <summary>
    /// Tree node
    /// </summary>
    public class TreeNode
    {
        public ICollection<TreeNode> ChildNodes
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public TreeNode()
        {
            ChildNodes = new List<TreeNode>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="text"></param>
        /// <param name="value"></param>
        public TreeNode(string text, string value)
        {
            Text = text;
            Value = value;
            ChildNodes = new List<TreeNode>();
        }

        public string TreePath { get; set; }

        /// <summary>
        /// Get or set tree node text
        /// </summary>
        public string Text { set; get; }

        /// <summary>
        /// Get or set tree node value
        /// </summary>
        public string Value { set; get; }

        /// <summary>
        /// 
        /// </summary>
        public int ChildCount { get; set; }

        /// <summary>
        /// True if tree node has children 
        /// </summary>
        public bool HasChildren
        {
            get
            {
                return ChildNodes != null && ChildNodes.Any();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="treenode"></param>
        /// <returns></returns>
        public TreeNode AddChild(TreeNode child)
        {
            ChildNodes.Add(child);
            return child;
        }

        public TreeNode AddChild(string text, string value)
        {
            var child = new TreeNode(text, value);
            ChildNodes.Add(child);
            return child;
        }
    }
}
